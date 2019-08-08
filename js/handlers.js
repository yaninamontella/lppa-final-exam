var addPegsEventHandlers= function(pegs) {
  for (var i= 0;i < pegs.length; i++) {
    pegs[i].onclick=selectPeg
  }
}

var addHolesEventHandlers= function(holes) {
  for (var i= 0;i < holes.length; i++){
    holes[i].onclick= movePeg
  }
}

var addResetEventHandlers= function(reset) {
  reset.onclick= resetBoard
}

var addSaveEventHandlers= function(save) {
  save.onclick= saveGame
}

var addLastGameEventHandlers= function(lastGame) {
  lastGame.onclick= getLastGame
}

var addSaveScoreOkEventHandlers= function(saveScoreOk) {
  saveScoreOk.onclick= saveScore
}

var addSaveScoreEventHandlers= function(saveScoreOk) {
  saveScoreOk.onclick= saveScore
}

var addSaveScoreCancelEventHandlers= function(saveScoreCancel) {
  saveScoreCancel.onclick= cancelScore
}

var addShowScoreTableEventHandlers= function(showScoreTableOk) {
  showScoreTableOk.onclick= showScoreTable
}

var addCloseScoreTableEventHandlers= function(scoreListOk) {
  scoreListOk.onclick= closeScoreTable
}

var addpostComEventHandlers= function(postCom) {
  postCom.onclick= sendComments
}

var init= function() {
  var boardElement= document.getElementById('board')
  boardElement.innerHTML= generateBoard()
  var pegs= boardElement.getElementsByClassName('peg')
  addPegsEventHandlers(pegs)
  var holes= boardElement.getElementsByClassName('hole')
  addHolesEventHandlers(holes)
  var reset= document.getElementById('reset')
  addResetEventHandlers(reset)
  var save= document.getElementById('save')
  addSaveEventHandlers(save)
  var lastGame= document.getElementById('last-game')
  addLastGameEventHandlers(lastGame)
  var saveScoreOk= document.getElementById('form-ok')
  addSaveScoreOkEventHandlers(saveScoreOk)
  var saveScoreCancel= document.getElementById('form-cancel')
  addSaveScoreCancelEventHandlers(saveScoreCancel)
  var showScoreTableOk= document.getElementById('button-score')
  addShowScoreTableEventHandlers(showScoreTableOk)
  var scoreListOk= document.getElementById('score-list-ok')
  addCloseScoreTableEventHandlers(scoreListOk)
  var postCom= document.getElementById('post-com')
  addpostComEventHandlers(postCom)
  gameOver()
}

window.onload=init
