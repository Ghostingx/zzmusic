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
	<div>
	<span class="startTime">00:00</span>
	<input class="play_pro" type="range" min="0" max="100" value="0">
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
    <script src='javascript/rangeSlider.js'></script>
    <script src="js/jquery-3.2.1.js"></script>
    <script>
	$('#volume').RangeSlider({ min: 0,   max: 100,  step: 0.1});    
    </script>
  </body>
</html>





