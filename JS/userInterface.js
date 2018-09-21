"use strict";

function getMousePos(canvas, evt){
  let rect = canvas.getBoundingClientRect();
  return{
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.w && pos.y < rect.y+rect.h && pos.y > rect.y
}

canvas.addEventListener('mousedown', function(evt){
  let mousePos = getMousePos(canvas,evt);
  let l = rects.length;
  let nPicked = numsPicked.length;
  for(let i=0; i<l; i++){
    if(isInside(mousePos,rects[i])){

      if(numsPicked.includes(i)){
        numsPicked.splice(numsPicked.indexOf(i),1);
        displayQuickPickNums();
      }else{
        let next = nPicked+1
        if(nPicked<maxPick){numsPicked.push(i);displayQuickPickNums();}
        else if(next>maxPick){displayMsg('Max Numbers Picked');}
      }
      markNumsPicked(numsPicked);
    }
  }
},false);

//checks for clicks draw buttons
btnCanvas.addEventListener('mousedown', function(evt){
  let mousePos = getMousePos(btnCanvas,evt);
  for(let i = minPick; i<=maxPick; i++){
    if(isInside(mousePos,buttonsMap.get(i))){
      quickPick(i);
      markNumsPicked(numsPicked);
      displayQuickPickNums();
    }
  }
  if(numsPicked.length>=minPick&&isInside(mousePos,buttonsMap.get("Play Button"))){
    playGame();
    displayCredit();
  }else if(isInside(mousePos,buttonsMap.get("Dec Bet"))){decBet();displayBet();displayPaytable();}
  else if(isInside(mousePos,buttonsMap.get("Inc Bet"))){incBet();displayBet();displayPaytable();}
  else if(isInside(mousePos,buttonsMap.get("Dec nGames"))){decnGames();displayNumGames();}
  else if(isInside(mousePos,buttonsMap.get("Inc nGames"))){incnGames();displayNumGames();}
  displayTotBet();
},false);
