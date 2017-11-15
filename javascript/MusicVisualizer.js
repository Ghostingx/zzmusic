function MusicVisualizer(obj){
  this.source=null;

  this.count=0;
  this.startOffset = 0;
  this.startTime = 0;
  this.totalTime=0;
  this.buffer=null;
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
    self.start(buffer); 
    self.buffer = buffer;
    console.log(buffer);
    console.log(self.buffer);
  },function(err){
    console.log(err);
  });
}

MusicVisualizer.prototype.play=function(url){
  var n=++this.count;
  var self=this;
  var offset = this.startOffset;
  this.source&&this.stop();
  this.load(url,function(arraybuffer){
    self.decode(arraybuffer,function(){})
  });
}

MusicVisualizer.prototype.start = function(buffer){
        var bs=MusicVisualizer.ac.createBufferSource();
        bs.connect(this.analyser);
        bs.buffer=buffer;
        //console.log(Math.round(buffer.duration));
      // console.log(offset);
        this.totalTime = buffer.duration;
        bs[bs.start?"start":"noteOn"](0,this.startOffset % this.totalTime);;
        this.source=bs;
      }

MusicVisualizer.prototype.resume=function(){
  //var self =this;
  console.log(this.buffer);
  this.start(this.buffer);

}

MusicVisualizer.prototype.stop=function(){
  this.source[this.source.stop?"stop":"noteOff"](0);
  this.startOffset = MusicVisualizer.ac.currentTime - this.startTime;
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
