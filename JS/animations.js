"use strict";

// const rate = 60;
//
// let xFin = x;
// let yFin = y;
// var xStart = x-w/2;
// var yStart = y-h/2;
//
// function popUp(x,y,w,h){
//
//   let inc = Math.floor((xFin-xStart)/rate);
//   if(x<xFin){
//     window.requestAnimationFrame(popUp);
//   }else{
//
//   }
// }

function fallIn(x,y,size1,size2,n,cvs,cb=()=>{}){
  let dif = (size1-size2)/n;
  shrink(n,size1);
  function shrink(n,size){
    let nSize = size-dif;
    cvs.clearRect(x-size,y-size,size*2,size*2);
    cvs.beginPath();
    cvs.arc(x,y,nSize,0,2*Math.PI);
    cvs.closePath();
    cvs.fill();
    if(n>0){
      window.requestAnimationFrame(()=>{
        shrink(n-1,nSize);
      });
    }else{
      cb();
    }
  }
}
