<!DOCTYPE html>
<html>
  <head>
    <title>Music</title>
    <link rel='stylesheet' href='css/style.css' />
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
  </head>
  <body>
    <div class="header">
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
        Volume <input id="volume" type="range" min="0" max="100" value="60">
      </p>
	</div>
	<br/>
	<div>
      <ul class="type" id="play_ctrl">
        <li id="prev" >上一曲</li>
        <li id="play" >播放</li>
        <li id="pause" >暂停</li>
        <li id="next" >下一曲</li>
      </ul></div>
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
		$file=$_REQUEST['song'];
		echo '<li title="'.$file.'">'.$file.'</li>';
               // } 
              //  closedir($dh);
             // }
         // }
          
        ?>
      </ul>
    </div>
    <div class="right" id="box"></div>
    <script src="javascript/MusicVisualizer.js"></script>
    <script src='javascript/index.js'></script>
  </body>
</html>





