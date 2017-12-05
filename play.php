<?php
  require_once "lib/include.php";
  $all_song=get_all_song();
  //var_dump($all_song);
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Music</title>
    <link rel='stylesheet' href='css/style.css' />
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
  </head>
  <body>
    <div class="header">
     <div class="song_info"><img class="singer_img" src="images/album/13.jpg"><span>星月神话<span></div>
     <div class="song_ctrl">
     <div>
      <ul class="type" id="type">
        <li data-type="dot">Dot</li>
        <li data-type="column" class="selected">Column</li>
        <li data-type="lyrics">Lyrics</li>
      </ul>
    </div>
     <div>
	<br/>
      <p class="vol">
        <input id="volume" type="range" min="0" max="100" value="60">
      </p>
	</div>
	<br/>
	<div>
	<div>
	<span class="startTime">00:00</span>
	<div id="wrapper">
   	    <div id="fill"></div>
    	    <div id="slider"></div>
	</div>
	<span class="endTime">00.00</span>
	</div>
	<div>
        <ul id="play_ctrl">
        <li><img id="prev" src="resources/bw.png" ></li>
        <!--li><img id="resume" src="resources/play.png" ></li-->
        <li><img id="pause_con" src="resources/stop.png" ></li>
        <li><img id="next" src="resources/fw.png" ></li>
      </ul></div></div>
	</div>
    </div>
    <div class="left">
      <ul id="list">
        <?php
          //$dir = "./media";
          // Open a known directory, and proceed to read its contents
          //if (is_dir($dir)) {
            //  if ($dh = opendir($dir)) {
               // while (($file = readdir($dh)) !== false) {
		// echo $file;
		//$file=$_REQUEST['song'];
		//$play_list=array("sleephead.mp3","我怀念的.mp3","敢爱敢做.mp3","最爱.mp3","朋友.mp3","海阔天空.mp3");
		  foreach($all_song as $song)
		echo '<li title="'.$song["song_name"].".mp3".'">'.$song["song_name"].'</li>';
               // } 
              //  closedir($dh);
             // }
         // }
          
        ?>
      </ul>
    </div>
    <div class="right" id="box"></div>
    <div class="lyric" id="lyric"><ul class="lyric_list"></ul></div>
    <script src="javascript/getLyric.js"></script>
    <script src="javascript/MusicVisualizer.js"></script>
    <script src='javascript/index.js'></script>
    <script src="js/jquery-3.2.1.js"></script>
    <script src='javascript/jquery.rotate.js'></script>
    <script src='javascript/slider.js'></script>
  </body>
</html>
