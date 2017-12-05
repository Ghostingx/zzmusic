<?php
require_once("configs.php");
require_once "mysql.func.php";
function get_top_song($n=10){
	$sql = "select * from song,singer where song.singer=singer.singer_id order by song.play_count desc limit ".$n.";";
	$res = fetchAll($sql);
	return $res;
}

function get_all_song(){
        $sql = "select song_name from song;";
        $res = fetchAll($sql);
        return $res;
}
//get_top_song();
