var showScore= function(){
  var newScore=document.getElementById('score-number')
  newScore.innerHTML=score
}

var movePeg= function(evt){
  var id=evt.target.id
  var pos=getPositionFromId(id)
  if(pos.x!=undefined && pos.y!=undefined){
    if(suggestions.includes(id)){
      var oldRow= selectedPeg.x
      var oldCol= selectedPeg.y
      var newRow= pos.x
      var newCol= pos.y
      var midRow= oldRow + ((newRow-oldRow)/2)
      var midCol= oldCol + ((newCol-oldCol)/2)
      board[oldRow][oldCol] = { value: 0 }
      board[midRow][midCol] = { value: 0 }
      board[newRow][newCol] = { value: 1 }
      selectedPeg={x:undefined, y:undefined}
      suggestions=[]
      score++
      showScore()
      init()
    }
  }
}

var resetBoard=function(evt){
  var option = confirm("¿Esta seguro que desea reiniciar el juego?")
  if(option==1){
    for (var i=0;i < board.length; i++){
      for (var j=0;j < board[i].length; j++){
        if (board[i][j]&&board[i][j].value===0) {
          board[i][j]={ value: 1 }
        }
      }
    }
  board[3][3] ={ value: 0 }
  score=0
  showScore()
  }
}

var saveGame=function(evt){
  var localBoard=JSON.stringify(board)
  localStorage.setItem('board', localBoard)
}

var getLastGame=function(evt){
  var guardado = localStorage.getItem('board')
  board= JSON.parse(guardado)
  init()
}

var addPegsEventHandlers=function(pegs){
  for (var i=0;i < pegs.length; i++){
    pegs[i].onclick=selectPeg
  }
}

var addHolesEventHandlers=function(holes){
  for (var i=0;i < holes.length; i++){
    holes[i].onclick=movePeg
  }
}

var addResetEventHandlers=function(reset){
  reset.onclick=resetBoard
}

var addSaveEventHandlers=function(save){
  save.onclick=saveGame
}

var addLastGameEventHandlers=function(lastGame){
  lastGame.onclick=getLastGame
}

var init= function(){
  var boardElement=document.getElementById('board')
  boardElement.innerHTML=generateBoard()
  var pegs=boardElement.getElementsByClassName('peg')
  addPegsEventHandlers(pegs)
  var holes= boardElement.getElementsByClassName('hole')
  addHolesEventHandlers(holes)
  var reset=document.getElementById('reset')
  addResetEventHandlers(reset)
  var save=document.getElementById('save')
  addSaveEventHandlers(save)
  var lastGame=document.getElementById('lastGame')
  addLastGameEventHandlers(lastGame)
}

window.onload=init
