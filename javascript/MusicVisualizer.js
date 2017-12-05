function MusicVisualizer(obj){
  this.source=null;

  this.count=0;
  this.url='';
  this.startOffset = 0;
  this.startTime = 0;
  this.totalTime=0;
  this.buffer=null;
  this.lyric=null;
  this.analyser=MusicVisualizer.ac.createAnalyser();
  this.size=obj.size;
  this.analyser.fftSize=this.size*2;
  
  this.gainNode=MusicVisualizer.ac[MusicVisualizer.ac.createGain?"createGain":"createGainNode"]();
  this.gainNode.connect(MusicVisualizer.ac.destination);

  this.analyser.connect(this.gainNode);

  this.xhr=new XMLHttpRequest();

  this.visualizer=obj.visualizer;

  this.visualize();
}

MusicVisualizer.ac=new (window.AudioContext||window.webkitAudioContext)();
//var isPlaying = false;
//var offset = 0;
//var time = 0;
//var total = 0;
MusicVisualizer.prototype.load=function(url,fun){
  this.xhr.abort();
  this.xhr.open("GET",url);
  this.xhr.responseType="arraybuffer";
  var self=this;
  this.xhr.onload=function(){
   // self.buffer=self.xhr.response;
   // console.log(self.xhr.response);
   // console.log(self.buffer);
    fun(self.xhr.response);
  }
  this.xhr.send();
}

MusicVisualizer.prototype.decode=function(arraybuffer,fun){
	var self = this;
  MusicVisualizer.ac.decodeAudioData(arraybuffer,function(buffer){
    self.start(buffer,0); 
    self.buffer = buffer;
    //console.log(buffer);
   // console.log(self.buffer);
  },function(err){
    console.log(err);
  });
}

MusicVisualizer.prototype.play=function(url){
  console.log(url);
  curTime = 0;
  clearInterval(timeinter);
  this.startOffset = 0;
   $('.endTime')[0].innerHTML="00:00";
  var n=++this.count;
  var self=this;
  //var offset = this.startOffset;
  this.source&&this.stop();
  if(this.url==url&&this.buffer){
    this.start(this.buffer,0)
  }else{
  this.url=url;
  this.load(url,function(arraybuffer){
    self.decode(arraybuffer,function(){})
  });
  }
}

MusicVisualizer.prototype.start = function(buffer,time){
        var bs=MusicVisualizer.ac.createBufferSource();
        bs.connect(this.analyser);
        bs.buffer=buffer;
        //console.log(Math.round(buffer.duration));
      // console.log(offset);
        this.totalTime = buffer.duration;
	var temp = Math.round(this.totalTime)%60;
	if(temp<10){
		$('.endTime')[0].innerHTML="0"+Math.floor(Math.round(this.totalTime)/60)+":"+"0"+temp;
	}else{
        	$('.endTime')[0].innerHTML="0"+Math.floor(Math.round(this.totalTime)/60)+":"+temp;
	}
//	total = this.totalTime;
	this.startTime = MusicVisualizer.ac.currentTime;
//	time = this.startTime;
	if(time < 0){
	        bs[bs.start?"start":"noteOn"](0,this.startOffset % this.totalTime);
	}else if(time == 0){
		bs[bs.start?"start":"noteOn"](0);
	}else{
		bs[bs.start?"start":"noteOn"](0,time);
	}
        this.source=bs;
//	isPlaying = true;
	console.log(bs);
      }

MusicVisualizer.prototype.resume=function(value){
  //var self =this;
  if(value > 0){
    newOffset = value*this.totalTime/400;
    this.start(this.buffer,newOffset);
    this.startOffset = newOffset;
  }else{
    console.log(this.buffer);
    this.start(this.buffer,-1);
  }
}

MusicVisualizer.prototype.stop=function(){
  this.source[this.source.stop?"stop":"noteOff"](0);
//  isPlaying = false;
  this.startOffset += MusicVisualizer.ac.currentTime - this.startTime;
//  offset = this.startOffset;
//  time = this.startTime;
}

MusicVisualizer.prototype.changeVolume=function(percent){
  this.gainNode.gain.value=percent*percent;
}

MusicVisualizer.prototype.visualize=function(){
  var arr=new Uint8Array(this.analyser.frequencyBinCount);

  requestAnimationFrame=window.requestAnimationFrame||
                        window.webkitRequestAnimationFrame||
                        window.mozRequestAnimationFrame;
  var self=this;
  function v(){
    self.analyser.getByteFrequencyData(arr);
    // console.log(arr);
    self.visualizer(arr);
    requestAnimationFrame(v);
  }

  requestAnimationFrame(v);
}
var xhrt=new XMLHttpRequest();
MusicVisualizer.prototype.loadLrc=function(url,fun){
  console.log(url);
  xhrt.abort();
  xhrt.open("GET",url);
  xhrt.responseType="text";
  xhrt.send();
  var self=this;
  xhrt.onload=function(){
  self.lyric= Object.keys(fun(xhrt.response));
  console.log(self.lyric);
  }
}

MusicVisualizer.prototype.parseLyric=function(lrc) {
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for(var i=0;i<lyrics.length;i++){
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if(!timeRegExpArr)continue;
        var clause = lyric.replace(timeReg,'');
        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
        }
    }
    return lrcObj;
}

//setInterval(function(){
//	if(isPlaying){
//		offset  += 0.1;
//		console.log(offset);
//		$('.play_pro')[0].value = offset / total  * 100;
//	}
//},100);
