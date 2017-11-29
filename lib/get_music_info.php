<?php
require_once "mysql.func.php"

func get_top_song($n=10){
	$sql = "select * from song,singer where song.singer=singer.singer_id order by song.play_count desc limit ".$n.";"
	$res = fetchAll($sql);
	return $res;
}