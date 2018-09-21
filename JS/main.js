"use strict";


const winWid = window.innerWidth;
const cWidth = winWid*0.8;
const cHeight = cWidth*0.6;
let cShiftX = 0;
if(winWid>cWidth){cShiftX = (winWid-cWidth)/2}
const cShiftY = 10;

const canvas = document.getElementById('mainCanvas'),
  BGCanvas = document.getElementById('BGCanvas'),
  GUICanvas = document.getElementById('GUICanvas'),
  aniCanvas = document.getElementById('aniCanvas'),
  disCanvas = document.getElementById('disCanvas'),
  gCanvas = document.getElementById('glassCanvas'),
  finCanvas = document.getElementById('finCanvas');

const canvasArr = [canvas, BGCanvas, GUICanvas, aniCanvas, disCanvas, finCanvas, gCanvas];

canvasArr.forEach(canvas=>{
  canvas.style.position = "absolute";
  canvas.style.top = cShiftY+'px';
  canvas.style.left = cShiftX+"px";
  canvas.width = cWidth;
  canvas.height = cHeight;
})
glassCanvas.height = cHeight*1.25;

BGCanvas.style.zIndex = -1;
GUICanvas.style.zIndex = -1;
aniCanvas.style.zIndex = -1;
disCanvas.style.zIndex = 1;
canvas.style.zIndex = 5;

const ctx = canvas.getContext('2d'),
  BGctx = BGCanvas.getContext('2d'),
  GUIctx = GUICanvas.getContext('2d'),
  anictx = aniCanvas.getContext('2d'),
  disctx = disCanvas.getContext('2d'),
  finctx = finCanvas.getContext('2d'),
  gctx = gCanvas.getContext('2d');

const ctxArr = [ctx,BGctx,GUIctx,disctx,finctx,gctx];
ctxArr.forEach(ctx=>{
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'white';
})

gctx.font = Math.floor(cHeight/20)+'px Chela';
BGctx.font = Math.floor(cHeight/20)+'px Chela';
disctx.font = Math.floor(cHeight/20)+'px Chela';
gctx.fillStyle = 'green';
disctx.fillStyle = 'red';
disctx.strokeStyle = 'black';

// const swoosh = new sound("./Sounds/Swoosh.wav");
const clink = new sound("./Sounds/Ding.wav");
const thud = new sound("./Sounds/Thud.wav");

const tileSpace = 10;
const xShift = tileSpace/2;
const yShift = -Math.floor(cHeight/20);

const xMargin = cWidth*0.2;

const tileSize = Math.floor((cWidth-2*xMargin)/numCols)-tileSpace;

const loadedImages = {};
const loc = "./Pictures/";
const pics = ['CosmicMoonBG.jpg','PinkPurpleYinYang.png'];

const loadedIMGsPromArr = returnPromiseImgArr(pics,loadedImages,loc);
Promise.all(loadedIMGsPromArr)
.then(document.fonts.load('12px Chela'))
.then(document.fonts.load('12px TheBlacklist'))
.then(()=>{
  createLayout();
  displayPaytable();
})

const xStart = xMargin+xShift;
const yStart = cHeight/2-tileSize*numRows/2+yShift;

const rects = [];
function createLayout(){
  BGctx.globalAlpha = 0.7;
  const fontSize = Math.floor(tileSize/2);
  ctx.font = fontSize+"px Chela";
  BGctx.drawImage(loadedImages['CosmicMoonBG'],0,0,cWidth,cHeight);
  BGctx.strokeRect(0,0,cWidth,cHeight);

  BGctx.globalAlpha = 1;
  //draws all boxes and numbers
  for(let i=0; i<numRows; i++){
    for(let j=0; j<numCols; j++){
      let xPos = j*(tileSize+tileSpace)+xStart;
      let yPos = i*(tileSize+tileSpace)+yStart;
      BGctx.strokeRect(xPos,yPos,tileSize,tileSize);
      BGctx.drawImage(loadedImages['PinkPurpleYinYang'],xPos,yPos,tileSize,tileSize);
      BGctx.fillText(i*numCols+j+1,xPos+tileSize/2,yPos+tileSize/2);
      //creates an array of box and strokes them
      rects.push({x:xPos,y:yPos,w:tileSize,h:tileSize,picked:false,winner:false});
    }
  }
}

const allBalls = [];
(function createAllBall(){
  for(let i = 1; i<=numRows*numCols; i++){
    allBalls.push(i);
  }
})()
