"use strict";

function playGame(){
    glassCanvas.style.zIndex = 10;
    finctx.clearRect(xMargin,0,cWidth-2*xMargin,cHeight);
    drawBalls();
    markDrawnballs(winners,payout);
    displayNumGames();
}

let winners = [];
function drawBalls(){winners = pickRandNums(20);}

let numsPicked = [];
function quickPick(n){numsPicked = pickRandNums(n);}

function pickRandNums(num){
  let arr = [];
  let balls = allBalls.slice();
  for(let i = 0; i<num; i++){
    let rand = Math.floor(Math.random()*balls.length);
    let ball = balls.splice(rand,1)-1;
    arr.push(ball);
  }
  return arr;
}

function payout(nCatch){
  if(nCatch>0){
    let payout = paytable[numsPicked.length-1][nCatch-1]*bet;
    credit += payout;
    updateCredit(payout);
    displayCredit();
    console.log("you won "+payout);
  }
  numGames-=1;
  if(numGames>0){
    playGame();
  }else{
    gctx.clearRect(xMargin,0,cWidth-2*xMargin,cHeight*0.9);//clears choosen numbers
    finctx.clearRect(xMargin,0,cWidth-2*xMargin,cHeight);
    glassCanvas.style.zIndex = -10;
    numGames=1;
  }
}

function markNumsPicked(numsPicked){
  GUIctx.clearRect(0,0,cWidth,cHeight);
  disctx.clearRect(0,0,cWidth,cHeight*0.9);
  numsPicked.forEach((numPicked)=>{
    let r = Math.floor(numPicked/numCols);
    let c = numPicked%numCols;

    let xPos = c*(tileSize+tileSpace)+xStart;
    let yPos = r*(tileSize+tileSpace)+yStart;
    disctx.fillText(numPicked+1,xPos+tileSize/2,yPos+tileSize/2);
    GUIctx.fillStyle="yellow";
    GUIctx.fillRect(xPos,yPos,tileSize,tileSize);
  });
}

function markDrawnballs(winners,cb){
  const rate = 15;
  let nCatch = 0;
  credit-=bet;
  const lineWid = Math.floor(tileSize/10);

  anictx.clearRect(0,0,cWidth,cHeight);
  let numWinners = winners.length;

  const gradient=anictx.createLinearGradient(0,0,cWidth,cHeight);
  gradient.addColorStop("0","magenta");
  gradient.addColorStop("0.5","blue");
  gradient.addColorStop("1.0","red");
  finctx.lineWidth=lineWid;

  dropBall(0,cb);
  function dropBall(n,cb){
    let ballPicked = winners[n];
    let r = Math.floor(ballPicked/numCols);
    let c = ballPicked%numCols;
    let xPos = c*(tileSize+tileSpace)+xStart+tileSize/2;
    let yPos = r*(tileSize+tileSpace)+yStart+tileSize/2;
    fallIn(xPos,yPos,tileSize*3,tileSize/2,rate,anictx,()=>{
      finctx.beginPath();
      finctx.arc(xPos,yPos,tileSize/2-lineWid/2,0,2*Math.PI);
      //sums number of hits
      numsPicked.forEach((numPicked)=>{
        if(numPicked==ballPicked){
          clink.play();
          console.log(ballPicked+1)
          gctx.fillText(numPicked+1,xPos,yPos);
          finctx.fillStyle = gradient;
          finctx.fill();
          nCatch+=1;
          displayPaytable(nCatch);
        }else{
          thud.play();
          finctx.stroke();
          finctx.strokeStyle = gradient;
        }
        finctx.closePath();
      });

      if(n<numWinners){
        dropBall(n+1,cb);
      }else{
        console.log("catch: " + nCatch);
        cb(nCatch);
      }
    })
  }
}

function incBet(){
  let totBet = numGames*(bet+betInc);
  if(totBet>credit){displayMsg('Insufficient Credit');}
  else if(bet<maxBet){bet+=betInc;}
  else{strokeAndFill(disctx,"Max Bet",disxPos,disyPos,disMaxWid);}
}

function decBet(){
  if(bet>minBet){
    bet-=betInc;
    disctx.clearRect(xMargin,cHeight*0.9,cWidth-2*xMargin,cHeight*0.1);//incase of insufficient credit display
  }
}

function incnGames(){
  let totBet = (numGames+1)*bet;
  if(totBet<=credit){numGames+=1;}
  else{displayMsg('Insufficient Credit');}
}

function decnGames(){
  if(numGames>1){
    numGames-=1;
    disctx.clearRect(xMargin,cHeight*0.9,cWidth-2*xMargin,cHeight*0.1);
  }
}
