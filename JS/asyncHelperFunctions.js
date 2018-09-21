"use strict"
//loads images
function returnPromiseImgArr(pictures,ImgObj,loc){
  return pictures.map(function(imgurl){
    var prom = new Promise(function(resolve, reject){
      var img = new Image();
      img.onload = function(){
        ImgObj[imgurl.split('.')[0]]=img;
        resolve();
      };
      img.src = loc+imgurl;
    });
    return prom;
  });
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

function fadeOut(text,ctx,a,x,y,dir,font,callback=()=>{}){
  ctx.font = font //make dynamic
  ctx.clearRect(x-200,y-100,400,200);
  ctx.globalAlpha = a;

  if(a>0){
    a-=0.02;
    if(dir=="up"){
      ctx.fillStyle = 'green';
      ctx.fillText('+'+text,x,y);
      y-=1;
    }else{
      ctx.fillStyle = 'red';
      ctx.fillText('-'+text,x,y);
      y+=1;
    }
    window.requestAnimationFrame(()=>{
      fadeOut(text,ctx,a,x,y,dir,callback);
    });
  }else{
    ctx.globalAlpha = 1;
    callback();
  }
}
