<?php 
/**
 * 连接数据库
 * @return resource
 */
function connect(){
	$link=new mysqli(DB_HOST,DB_USER,DB_PWD,DB_DBNAME) or die("数据库连接失败Error");
	$link->query("set names utf8");	
//mysql_set_charset(DB_CHARSET);
	//mysql_select_db(DB_DBNAME) or die("指定数据库打开失败");
	return $link;
}

/**
 * 完成记录插入的操作
 * @param string $table
 * @param array $array
 * @return number
 */
function insert($table,$array){
	$keys=join(",",array_keys($array));
	$vals="'".join("','",array_values($array))."'";
	$sql="insert {$table}($keys) values({$vals})";
	$mysql=connect();
	//echo $sql;

	//var_dump($mysql);
//	echo $sql;
	$suc= $mysql->query($sql);
	$mysql->close();
	//return mysql_insert_id();
	return $suc;
}
//update imooc_admin set username='king' where id=1
/**
 * 记录的更新操作
 * @param string $table
 * @param array $array
 * @param string $where
 * @return number
 */
function update($table,$array,$where=null){
	foreach($array as $key=>$val){
		if($str==null){
			$sep="";
		}else{
			$sep=",";
		}
		$str.=$sep.$key."='".$val."'";
	}
		
		$sql="update {$table} set {$str} ".($where==null?null:" where ".$where);
		$mysql=connect();
		$result=$mysql->query($sql);
		//var_dump($result);
		//var_dump(mysql_affected_rows());exit;
		if($result){
			$affected_rows= $mysql->affected_rows;
		//	$result->free();
			$mysql->close();
			return $affected_rows;
		}else{
                  //      $result->free();
                        $mysql->close();

			return false;
		}
}

/**
 *	删除记录
 * @param string $table
 * @param string $where
 * @return number
 */
function delete($table,$where=null){
	$where=$where==null?null:" where ".$where;
	$sql="delete from {$table} {$where}";
	$mysql=connect();
	$mysql->query($sql);
	$a=$mysql->affected_rows;
	$mysql->close();
	return $a;
}

/**
 *得到指定一条记录
 * @param string $sql
 * @param string $result_type
 * @return multitype:
 */
function fetchOne($sql){
	$mysql=connect();
        $result=$mysql->query($sql);
	$row=$result->fetch_array();
//	$mysql->close();
	$result->free();
        $mysql->close();
	return $row;
}


/**
 * 得到结果集中所有记录 ...
 * @param string $sql
 * @param string $result_type
 * @return multitype:
 */
function fetchAll($sql){
	$mysql=connect();
	$result=$mysql->query($sql);
	while($row=$result->fetch_assoc()){
		$rows[]=$row;
	}
	$result->free();
	$mysql->close();
	return $rows;
}

/**
 * 得到结果集中的记录条数
 * @param unknown_type $sql
 * @return number
 */
function getResultNum($sql){
	$mysql=connect();
        $result=$mysql->query($sql);
	$rows= $result->num_rows;
	$result->free();
	$mysql->close();
	return $rows;
}

/**
 * 得到上一步插入记录的ID号
 * @return number
 */
function getInsertId(){
//	echo 'll';
	$mysql=connect();
//	echo 'jj';
//	var_dump($mysql);
	$result=$mysql->query("select max(id) mid from eb_pro");

	echo 'xxx';
	$row=$result->fetch_array();
	$result->free();
	$mysql->close();
	var_dump($row);
	return $row['mid'];
}

