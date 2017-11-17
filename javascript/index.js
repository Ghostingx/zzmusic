function $(s){
  return document.querySelectorAll(s);
}

var lis=$('#list li');
//var resume=$('#resume')[0];
var pause_con=$('#pause_con')[0]
var playing = false;
var timeinter;
var curTime = 0;

var size=128;

var box=$("#box")[0];
var height,width;
var canvas=document.createElement("canvas");
var ctx=canvas.getContext("2d");
box.appendChild(canvas);
var Dots=[];
var line;
var isPlaying;

var degree = 0;
var mv=new MusicVisualizer({
  size:size,
  visualizer:draw
});
for(var i=0;i<lis.length;i++){
  lis[i].onclick=function(){
    for(var j=0;j<lis.length;j++){
      lis[j].className="";
    }
    this.className="selected";
    mv.play("../media/"+this.title);
    pause_con.src="resources/play.png";
    isPlaying=this.title;
    playing=true;
    timeinter = setInterval(function(){
            if(playing){
                curTime += 0.1;
	        //console.log(curTime);
	    }
            if(curTime-Math.round(curTime)>=0){
		var temp = Math.round(curTime)%60;
		if(temp<10){
			$('.startTime')[0].innerHTML="0"+Math.floor(Math.round(curTime)/60)+":"+"0"+temp;
		}else
	        $('.startTime')[0].innerHTML="0"+Math.floor(Math.round(curTime)/60)+":"+temp;
            }
	    //console.log(mv.totalTime);
	    //$('.play_pro')[0].value = curTime/mv.totalTime*100; 
	   // console.log(curTime);
	   // console.log(mv.totalTime);
	    if(mv.totalTime>0&&curTime>=mv.totalTime){
		curTime=0;
                pause_con.src="resources/stop.png";
                clearInterval(timeinter);
	    }
	    $('#slider')[0].style.left=curTime/mv.totalTime*400+"px";
            $('#fill')[0].style.width=curTime/mv.totalTime*400+"px";
	   // $('.singer_img').rorate(1);
	   degree += 1.5;
	   degree=degree%360;
	   $('.singer_img').css('rotate', degree);
        },100);
  }
}
pause_con.onclick=function(){
  if(playing){
    if(this.className == "selected"){
      this.className ="" ;
    }else{
     this.className == "selected";
    }
    mv.stop();
    clearInterval(timeinter);
    this.src="resources/stop.png";
    playing = false;
  }else{
    if(this.className == "selected"){
      this.className ="" ;
    }else{
      this.className == "selected";
    }
    mv.resume(0);
    timeinter = setInterval(function(){
            if(playing){
                curTime += 0.1;
	    }
            if(curTime-Math.round(curTime)>=0){
	    var temp = Math.round(curTime)%60;
                if(temp<10){
                        $('.startTime')[0].innerHTML="0"+Math.floor(Math.round(curTime)/60)+":"+"0"+temp;
                }else
                $('.startTime')[0].innerHTML="0"+Math.floor(Math.round(curTime)/60)+":"+temp;
	    }
	    $('#slider')[0].style.left=curTime/mv.totalTime*400+"px";
            $('#fill')[0].style.width=curTime/mv.totalTime*400+"px";
	    if(mv.totalTime>0 && curTime>=mv.totalTime){
		curTime=0;
                pause_con.src="resources/stop.png";
		clearInterval(timeinter);
	    }
	   degree += 1.5;
           degree=degree%360;
           $('.singer_img').css('rotate', degree);
        },100);
    this.src="resources/play.png";
    playing = true;
  }
}
//resume.onclick=function(){
//  if(this.className == "selected"){
//    this.className ="" ;
//  }else{
//   this.className == "selected";
//  }
//  mv.resume(0);
//}



function random(m,n){
  return Math.round(Math.random()*(n-m)+m);
}
function getDots(){
  Dots=[];
  for(var i=0;i<size;i++){
    var x=random(0,width);
    var y=random(0,height);
    var color="rgba("+random(0,255)+","+random(0,255)+","+random(0,255)+",0)";
    Dots.push({
      x:x,
      y:y,
      dx:random(1,4),
      color:color,
      cap:0
    });
  }
}

function resize(){
  height=box.clientHeight;
  width=box.clientWidth;
  canvas.height=height;
  canvas.width=width;
  line=ctx.createLinearGradient(0,0,0,height);
  line.addColorStop(0,"red");
  line.addColorStop(0.5,"yellow");
  line.addColorStop(1,"green");
  getDots();
}
resize();

window.onresize=resize;

function draw(arr){
  ctx.clearRect(0,0,width,height);
  var w=width/size;
  var cw=w*0.6
  var capH=cw>10?10:cw;
  ctx.fillStyle=line;
  for(var i=0;i<size;i++){
    var o=Dots[i];
    if(draw.type=="column"){
    var h=arr[i]/256*height;
    ctx.fillRect(w*i,height-h,cw,h);
    ctx.fillRect(w*i,height-(o.cap+capH),cw,capH);
    o.cap--;
    if(o.cap<0){
      o.cap=0;
    }
    if(h>0&&o.cap<h+40){
      o.cap=h+40>height-capH?height-capH:h+40;
    }
    }else if(draw.type=="dot"){
      ctx.beginPath();

      var r=10+arr[i]/256*(height>width?width:height)/10;
      ctx.arc(o.x,o.y,r,0,Math.PI*2,true);
      var g=ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,r);
      g.addColorStop(0,"#fff");
      g.addColorStop(1,o.color);
      ctx.fillStyle=g;
      ctx.fill();
      o.x+=o.dx;
      o.x=o.x>width?0:o.x;
      // ctx.strokeStyle="#fff";
      // ctx.stroke();
    }
  }
}

draw.type="column";
var types=$("#type li");
for(var i=0;i<types.length;i++){
  types[i].onclick=function(){
    for(var j=0;j<types.length;j++){
      types[j].className="";
    }
    this.className="selected";
    draw.type=this.getAttribute("data-type");
  }
}

var play_pro_onclick=function(value){
	mv.stop();
	mv.resume(value);
	playing = true;
	pause_con.src="resources/play.png";
	   // $('.singer_img').rorate(1);
	curTime=Math.round(value*mv.totalTime/400);
	clearInterval(timeinter);
	timeinter = setInterval(function(){
            if(playing){
                curTime += 0.1;
            }
            if(curTime-Math.round(curTime)>=0){
            var temp = Math.round(curTime)%60;
                if(temp<10){
                        $('.startTime')[0].innerHTML="0"+Math.floor(Math.round(curTime)/60)+":"+"0"+temp;
                }else
                $('.startTime')[0].innerHTML="0"+Math.floor(Math.round(curTime)/60)+":"+temp;
            }
            $('#slider')[0].style.left=curTime/mv.totalTime*400+"px";
            $('#fill')[0].style.width=curTime/mv.totalTime*400+"px";
            if(mv.totalTime>0 && curTime>=mv.totalTime){
		curTime=0;
		pause_con.src="resources/stop.png";
                clearInterval(timeinter);
	    }
           degree += 1.5;
           degree=degree%360;
           $('.singer_img').css('rotate', degree);
        },100);
}

$("#volume")[0].onchange=function(){
  mv.changeVolume(this.value/this.max);
}

$("#volume")[0].onchange();
