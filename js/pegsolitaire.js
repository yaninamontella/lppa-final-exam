var createId= function(rowN, colN) {
  return 'peg-'+rowN+'-'+colN
}

var getPositionFromId = function(id) {
  var idParts = id && id.length ? id.split('-') : []
  if (idParts.length === 3) {
    return {
      x: parseInt(idParts[1]),
      y: parseInt(idParts[2])
    }
  }
  return {}
}

var generateCell= function (cell, rowN, colN){
  var html= '<button id="'+ createId(rowN, colN)+'" class="'
  if(cell && cell.value){
    html+= 'peg'
  }
  else if (cell && cell.value==0){
    html+= 'hole'
  }
  else {
        html+= 'hidden'
  }
    html+= '"></button>'
    return html
}

var generateRow= function(row, rowN){
  var html='<div class="row">'
  for (var j=0;j < row.length; j++){
    html +=generateCell(row[j],rowN, j)
  }
  html+= '</div>'
  return html
}

var generateBoard=function(){
  var html= '<div class="mainrow">'
  for (var i=0;i < board.length; i++){
    html+=generateRow(board[i],i)
  }
  html +='</div>'
  return html
}

var unselectPeg=function(){
  if (selectedPeg.x!=undefined && selectedPeg.y!=undefined){
    var prevSelectId=createId(selectedPeg.x, selectedPeg.y)
    document.getElementById(prevSelectId).className='peg'
    var suggestion= document.getElementsByClassName('suggestion')
    for (var i=0;i < suggestion.length; i++){
      suggestion[i].className='hole'
    }
  }
}

var getElement= function(id){
  var element=document.getElementById(id)
  return element || {}
}

var showSuggestions=function(){
  var near={
    above:getElement(createId(selectedPeg.x -1, selectedPeg.y)),
    left:getElement(createId(selectedPeg.x, selectedPeg.y-1)),
    right:getElement(createId(selectedPeg.x , selectedPeg.y+1)),
    bellow:getElement(createId(selectedPeg.x +1, selectedPeg.y)),
  }
  var possible={
    above:getElement(createId(selectedPeg.x -2, selectedPeg.y)),
    left:getElement(createId(selectedPeg.x, selectedPeg.y-2)),
    right:getElement(createId(selectedPeg.x , selectedPeg.y+2)),
    bellow:getElement(createId(selectedPeg.x +2, selectedPeg.y)),
  }
  if(near.above.className=='peg'&& possible.above.className=='hole'){
    possible.above.className='suggestion'
    suggestions.push(possible.above.id)
  }
  if(near.left.className=='peg'&& possible.left.className=='hole'){
    possible.left.className='suggestion'
    suggestions.push(possible.left.id)
  }
  if(near.right.className=='peg'&& possible.right.className=='hole'){
    possible.right.className='suggestion'
    suggestions.push(possible.right.id)
  }
  if(near.bellow.className=='peg'&& possible.bellow.className=='hole'){
    possible.bellow.className='suggestion'
    suggestions.push(possible.bellow.id)
  }
}

var selectPeg=function(evt){
  suggestions=[]
  var peg=evt.target
  var idParts=peg.id&&peg.id.length ? peg.id.split('-'):[]
  if(idParts.length===3){
    if(selectedPeg.x=== parseInt(idParts[1])&&selectedPeg.y=== parseInt(idParts[2])){
      unselectPeg()
      selectedPeg.x=undefined
      selectedPeg.y=undefined
    }
    else {
      unselectPeg()
      selectedPeg.x=parseInt(idParts[1])
      selectedPeg.y=parseInt(idParts[2])
      peg.className='selected'
      showSuggestions()
    }
  }
}
