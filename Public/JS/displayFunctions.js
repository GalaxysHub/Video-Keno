"use strict";
const btncHeight = Math.floor(cHeight*0.25);

const btnCanvas = document.getElementById('btnCanvas');
const BGbtnCanvas = document.getElementById('BGbtnCanvas');

const BGCanvasArr = [btnCanvas, BGbtnCanvas];

BGCanvasArr.forEach(cvn=>{
  cvn.style.position = "absolute";
  cvn.style.top = cShiftY+cHeight+'px';
  cvn.style.left = canvas.style.left;
  cvn.width = cWidth;
  cvn.height = btncHeight;
})
btnCanvas.style.zIndex = 1;
BGbtnCanvas.style.zIndex = -1;

const BTNctx = btnCanvas.getContext('2d');
const BGBTNctx = BGbtnCanvas.getContext('2d');
const BTNctxArr = [BTNctx, BGBTNctx]

BTNctxArr.forEach(ctx =>{
  ctx.textAlign = "center";
  ctx.textBaseline = 'middle';
})
BGBTNctx.strokeRect(0, 0, cWidth, btncHeight);
BTNctx.fillStyle = 'white';

const btnImages = {};
const btnPics = ['background2.jpg','WhiteSquare.png','RedButtonMain.png','RightSideArrow.png','LeftSideArrow.png'];
const btnPicsLoc = "./Pictures/";

const BtnIMGsPromArr = returnPromiseImgArr(btnPics,btnImages,btnPicsLoc);
Promise.all(BtnIMGsPromArr)
.then(document.fonts.load('12px Chela'))
.then(document.fonts.load('12px TheBlacklist'))
.then(()=>{
  BGBTNctx.drawImage(btnImages['background2'],0,0,cWidth,btncHeight);
  setQuickPickNums();
  drawPlayButton();
  displayQuickPickNums();
  displayBet();
  displayNumGames();
  displayCredit();
  displayTotBet();
  setSideArrows();
  drawAllBtns();
});

let buttonsMap = new Map();

const numPicks = maxPick-minPick+1;
const pickNumXStart = xMargin;
const numXSpace = Math.floor(cWidth/100);
const pickNumYStart = btncHeight*0.05;
const numSize = Math.floor((cWidth-2*xMargin-(numPicks-1)*numXSpace)/numPicks);

function setQuickPickNums(){
  for(let i = 0; i<numPicks; i++){
    var xPos = pickNumXStart+(numSize+numXSpace)*i;
    var yPos = pickNumYStart;
    var num = i+minPick;
    buttonsMap.set(num,{img:'WhiteSquare',x:xPos, y:yPos, w:numSize, h:numSize});
  }
}

function displayQuickPickNums(){
  const fontSize = numSize;
  BTNctx.font = fontSize+"px Chela";
  let nPicked = numsPicked.length;
  BTNctx.clearRect(xMargin,pickNumYStart,cWidth-2*xMargin,numSize);

  if(nPicked<minPick){displayMsg("Pick at least "+minPick+" number(s) to play");
  }else{disctx.clearRect(xMargin,cHeight*0.9,cWidth-2*xMargin,cHeight*0.1);//clears display Instrucitions
  }

  for(let i = 0; i<numPicks; i++){
    var xPos = pickNumXStart+(numSize+numXSpace)*i;
    var yPos = pickNumYStart;
    var num = i+minPick;
    if(num==nPicked){BTNctx.fillStyle = 'red';
    }else{BTNctx.fillStyle = "black";}
    BTNctx.fillText(num,xPos+numSize/2,yPos+(numSize-numSize/2),numSize);
  }
  displayPaytable();
  BTNctx.fillStyle = 'white';
}

function displayPaytable(nCatch=0){
  let nPicked = numsPicked.length
  const fontSize = Math.floor(cHeight/20);
  const yStart = Math.floor(cHeight/5);
  ctx.font = fontSize+'px Chela';

  ctx.clearRect(0,0,xMargin,cHeight);
  ctx.fillText('Catch',xMargin/4,yStart-fontSize/2,xMargin/2);
  ctx.fillText('Payout',xMargin*3/4,yStart-fontSize/2,xMargin/2);

  if(nPicked>=minPick){
    let PT = paytable[nPicked-1];

    let d = 1;
    for(let i = 0, j=PT.length; i<j; i++){
      let yPos = yStart+fontSize*d;
      let payout = PT[i];
      if(payout!=0){
        if((nCatch-1)==i){
          disctx.fillText(i+1,xMargin/4,yPos);
          disctx.fillText(PT[i]*bet,xMargin*3/4,yPos,(xMargin/2)*0.9);
        }else{
          ctx.fillText(i+1,xMargin/4,yPos);
          ctx.fillText(PT[i]*bet,xMargin*3/4,yPos,(xMargin/2)*0.9);
        }
        d+=1;
      }
    }
  }
}

const playBtnYPos = Math.floor(numSize*2.5),
  playFontSize = Math.floor(btncHeight/4),
  playBtnWid = Math.floor(3*playFontSize);
function drawPlayButton(){
  const xPos = cWidth/2;
  const maxWid = cWidth/2;
  BTNctx.font = playFontSize+"px Chela";

  const btnHeight = Math.floor(playFontSize*1.8),
    btnXPos = xPos-playBtnWid/2,
    btnYPos = playBtnYPos-btnHeight/2;

  BTNctx.fillText("Play",xPos,playBtnYPos,maxWid);
  buttonsMap.set("Play Button",{img:'RedButtonMain',x:btnXPos,y:btnYPos,w:playBtnWid,h:btnHeight})
}

function updateCredit(amt){
  const fontSize = cHeight/20;
  const xPos = cWidth-xMargin/2;
  const yPos = cHeight*0.35;
  fadeOut(amt,anictx,1,xPos,yPos,'up',fontSize+"px TheBlacklist");
}

function displayCredit(){
  anictx.globalAlpha = 1;
  const fontSize = cHeight/20;
  const xPos = cWidth-xMargin/2;
  const yPos = cHeight*0.35;
  ctx.font = fontSize+"px TheBlacklist";
  ctx.clearRect(xPos-xMargin/2,yPos-fontSize/2,xMargin,2*fontSize);
  ctx.fillText('Credit',xPos,yPos-fontSize);
  ctx.fillText(credit,xPos,yPos+fontSize);
}

function displayTotBet(){
  const fontSize = cHeight/20;
  const xPos = cWidth-xMargin/2;
  const yPos = cHeight*0.65;

  let totBet =  bet*numGames;

  ctx.font = fontSize+"px TheBlacklist";
  ctx.clearRect(xPos-xMargin/2,yPos-fontSize/2,xMargin,2*fontSize);
  ctx.fillText('Total Bet',xPos,yPos-fontSize);
  ctx.fillText(totBet,xPos,yPos+fontSize);
}

const betxPos = (cWidth/2+xMargin-playBtnWid/2)/2;
const betFont = Math.floor(btncHeight/5);
function displayBet(){
  const fontSize = betFont;
  const yPos = playBtnYPos;
  BTNctx.font = fontSize+"px Chela";
  BTNctx.clearRect(betxPos-cWidth/10,yPos-fontSize,cWidth/5,2*fontSize);
  BTNctx.fillText('Bet',betxPos,yPos-fontSize/2);
  BTNctx.fillText(bet,betxPos,yPos+fontSize/2);
}

const nGamesxPos = (cWidth*1.5-xMargin+playBtnWid/2)/2;
function displayNumGames(){
  const fontSize = betFont;
  const yPos = playBtnYPos;
  BTNctx.font = fontSize+"px Chela";
  BTNctx.clearRect(nGamesxPos-cWidth/10,yPos-fontSize,cWidth/5,2*fontSize);
  BTNctx.fillText('# Games',nGamesxPos,yPos-fontSize/2,cWidth/15);
  BTNctx.fillText(numGames,nGamesxPos,yPos+fontSize/2);
}

function setSideArrows(){
  const btnSize = Math.floor(cWidth*0.04);
  const yPos = playBtnYPos-btnSize/2;

  const xDecBet = Math.floor(betxPos-btnSize*2),
    xIncBet = Math.floor(betxPos+btnSize),
    xDecnGames = Math.floor(nGamesxPos-btnSize*2),
    xIncnGames = Math.floor(nGamesxPos+btnSize);

  buttonsMap.set('Dec Bet',{img:'LeftSideArrow',x:xDecBet,y:yPos,w:btnSize,h:btnSize})
  buttonsMap.set('Inc Bet',{img:'RightSideArrow',x:xIncBet,y:yPos,w:btnSize,h:btnSize})
  buttonsMap.set('Dec nGames',{img:'LeftSideArrow',x:xDecnGames,y:yPos,w:btnSize,h:btnSize})
  buttonsMap.set('Inc nGames',{img:'RightSideArrow', x:xIncnGames,y:yPos,w:btnSize,h:btnSize});
}

function drawAllBtns(){
  buttonsMap.forEach(v=>{
    BGBTNctx.drawImage(btnImages[v.img],v.x,v.y,v.w,v.h);
  })
}

const disMaxWid = Math.floor(cWidth/3);
const disxPos =  cWidth/2;
const disyPos = Math.floor(cHeight*.95);

function displayMsg(msg){
  strokeAndFill(disctx,msg,Math.floor(cWidth/2),Math.floor(cHeight*0.95),Math.floor(cWidth/3))
}

function strokeAndFill(cvs,msg,x,y,maxW){
  cvs.strokeText(msg,x,y,maxW);
  cvs.fillText(msg,x,y,maxW);
}
