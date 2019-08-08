var showScore= function() {
  var newScore= document.getElementById('score-number')
  newScore.innerHTML= score
  init()
}

var movePeg= function(evt) {
  var id=evt.target.id
  var pos=getPositionFromId(id)
  if(pos.x!=undefined && pos.y!=undefined) {
    if(suggestions.includes(id)){
      var oldRow= selectedPeg.x
      var oldCol= selectedPeg.y
      var newRow= pos.x
      var newCol= pos.y
      var midRow= oldRow + ((newRow-oldRow)/2)
      var midCol= oldCol + ((newCol-oldCol)/2)
      board[oldRow][oldCol]= {value: 0}
      board[midRow][midCol]= {value: 0}
      board[newRow][newCol]= {value: 1}
      selectedPeg= {x:undefined, y:undefined}
      suggestions= []
      score++
      showScore()
    }
  }
}

var resetBoard= function(evt) {
  var option= confirm('¿Esta seguro que desea reiniciar el juego?')
  if(option== 1){
    for (var i= 0;i < board.length; i++){
      for (var j= 0;j < board[i].length; j++){
        if (board[i][j]&&board[i][j].value=== 0) {
          board[i][j]= {value: 1}
        }
      }
    }
  board[3][3]= {value: 0}
  score= 0
  showScore()
  }
}

var saveGame= function(evt) {
  var localBoard= JSON.stringify(board)
  localStorage.setItem('board', localBoard)
}

var getLastGame= function(evt) {
  score= 0
  var guardado= localStorage.getItem('board')
  board= JSON.parse(guardado)
  showScore()
}

var unselectPeg= function() {
  if (selectedPeg.x!= undefined && selectedPeg.y!= undefined) {
    var prevSelectId=createId(selectedPeg.x, selectedPeg.y)
    document.getElementById(prevSelectId).className= 'peg'
    var suggestion= document.getElementsByClassName('suggestion')
    for (var i= 0;i < suggestion.length; i++) {
      suggestion[i].className= 'hole'
    }
    init()
  }
}

var getElement= function(id) {
  var element= document.getElementById(id)
  return element || {}
}

var createSuggestions= function() {
  var near= {
    above:getElement(createId(selectedPeg.x -1, selectedPeg.y)),
    left:getElement(createId(selectedPeg.x, selectedPeg.y-1)),
    right:getElement(createId(selectedPeg.x , selectedPeg.y+1)),
    bellow:getElement(createId(selectedPeg.x +1, selectedPeg.y)),
  }
  var possible= {
    above:getElement(createId(selectedPeg.x -2, selectedPeg.y)),
    left:getElement(createId(selectedPeg.x, selectedPeg.y-2)),
    right:getElement(createId(selectedPeg.x , selectedPeg.y+2)),
    bellow:getElement(createId(selectedPeg.x +2, selectedPeg.y)),
  }
  if(near.above.className== 'peg'&& possible.above.className== 'hole') {
    suggestions.push(possible.above.id)
  }
  if(near.left.className== 'peg'&& possible.left.className== 'hole') {
    suggestions.push(possible.left.id)
  }
  if(near.right.className== 'peg'&& possible.right.className== 'hole') {
    suggestions.push(possible.right.id)
  }
  if(near.bellow.className== 'peg'&& possible.bellow.className== 'hole') {
    suggestions.push(possible.bellow.id)
  }
}

var showSuggestions= function() {
  suggestions= []
  createSuggestions()
  var elementSuggestion= undefined
  for (var i= 0;i < suggestions.length; i++) {
    elementSuggestion= document.getElementById(suggestions[i])
    elementSuggestion.className= 'suggestion'
  }
}

var selectPeg= function(evt) {
  var peg= evt.target
  var idParts= peg.id&&peg.id.length ? peg.id.split('-'):[]
  if(idParts.length=== 3){
    if(selectedPeg.x=== parseInt(idParts[1])&&selectedPeg.y=== parseInt(idParts[2])){
      unselectPeg()
      selectedPeg.x= undefined
      selectedPeg.y= undefined
    }
    else {
      unselectPeg()
      selectedPeg.x= parseInt(idParts[1])
      selectedPeg.y= parseInt(idParts[2])
      peg.className= 'selected'
      showSuggestions()
    }
  }
  if (posibilities=== 0) {
    window.alert('No hay mas movimientos posibles')
  }
}

var saveName= function() {
  var option= window.confirm('No hay mas movimientos posibles¿Desea guardar su puntaje?')
  if(option== 1){
    var form= document.getElementsByClassName('save-user')
    form[0].style.display= 'inline-block'
    var formScore=document.getElementsByClassName('form-score')
    formScore[0].innerHTML= 'puntaje acumulado: '+ score
  }
}

var gameOver= function() {
  listPegs= document.getElementsByClassName('peg')
  posibilities= 0
  for (var i= 0;i < listPegs.length; i++){
    var peg= listPegs[i]
    var idParts= peg.id&&peg.id.length ? peg.id.split('-'):[]
    if(idParts.length=== 3){
      selectedPeg.x= parseInt(idParts[1])
      selectedPeg.y= parseInt(idParts[2])
      createSuggestions()
      if(suggestions.length>0){
        posibilities= 1
        i=listPegs.length
      }
    }
  }
  suggestions= []
  if (posibilities=== 0) {
    saveName()
  }
}

var saveScore= function() {
  var userScore= document.getElementsByClassName('form-name')
  if(userScore[0].value.length<3){
    alert('El nombre debe tener un mínimo de 3 caracteres')
  }
  else {
    scoreTable.push({name:userScore[0].value , score: score})
    var form= document.getElementsByClassName('save-user')
    form[0].style.display= 'none'
    userScore[0].value= ''
  }
}

var cancelScore= function() {
  var userScore= document.getElementsByClassName('form-name')
  var form= document.getElementsByClassName('save-user')
  form[0].style.display= 'none'
  userScore[0].value= ''
}

var showScoreTable= function() {
  scoreTable.sort(orderList)
  scoreTable.splice(10)
  var html= '<ol class="listscore">'
  for (var i= 0;i < scoreTable.length; i++) {
    html+= '<li>'+scoreTable[i].name +'= '+scoreTable[i].score+'</li>'
  }
  html += '</ol>'
  var boardScore= document.getElementById('score-list')
  boardScore.innerHTML= html
  var form= document.getElementsByClassName('score-table ')
  form[0].style.display= 'inline-block'
}

var closeScoreTable= function() {
  var form= document.getElementsByClassName('score-table')
  form[0].style.display= 'none'
}

var orderList= function(a, b) {
  return b.score - a.score
}

var sendComments= function enviarCorreo() {
  bodyText= document.getElementsByClassName('send-mess')
  mailto= 'yani_montella@hotmail.com'
  var sEmail= document.getElementsByClassName('send-email')
  var sLink= 'mailto:' + escape(mailto)
     + '?subject=' + escape('Comentario')
     + '&body=' + bodyText[0].value
  window.location.href= sLink
}
