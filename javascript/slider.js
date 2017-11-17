var slider=(function(){
    init=function(){
        var wrapper=document.getElementById('wrapper');
        var slider=document.getElementById('slider');
        var fill=document.getElementById('fill');
        move(wrapper,slider,fill);
    };
    move=function(dom1,dom2,dom3){
        var drag=0;
    
        dom1.addEventListener('click',function (e) {
	    console.log(e);
            if(e.target===dom2){
                            
            }else{
                if(e.offsetX>400) {
                    dom2.style.left='400px';
                    dom3.style.width='400px';
                }else if(e.offsetX<5){
                    dom2.style.left='0px';
                    dom3.style.width='0px';
		    play_pro_onclick(0);
                }else{
                    dom2.style.left=e.offsetX-2+'px';
                    dom3.style.width=e.offsetX-2+'px';
		    play_pro_onclick(e.offsetX);
                }
            }
        });
               
        dom2.addEventListener('mousedown',function(){
            drag=1;
        });
              
        document.addEventListener('mouseup',function(){
            drag=0;
        });      
        dom1.addEventListener('mousemove',function(e){
            if(drag==1){
                if(e.pageX>189) {
                    dom2.style.left='400px';
                    dom3.style.width='400px';
                }else if(e.pageX<5){
                    dom2.style.left='0px';
                    dom3.style.width='0px';
                }else{
                    dom2.style.left=e.pageX-4+'px';
                    dom3.style.width=e.pageX-4+'px';
                }
            }
        });

    };
    return {
        init:init
    }
})();
slider.init();
