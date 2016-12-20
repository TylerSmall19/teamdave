var game = {
  numPlayers: 2,

  playerTurn: 1,

  players: [],

  play: function(){
    $('#game-board').on('click', '.cell', this.takeTurn.bind(this));
  },

  takeTurn: function(e){
    cell = e.target;
    $(cell).html(this.currentPlayer().gameSym);

    if ( this.hasWinner() ) {
      this.endGame();
    };

    // this.changePlayer();
  },

  currentPlayerIndex: 0,

  changePlayer: function(){
    if (this.currentPlayerIndex === 0) {
      this.currentPlayerIndex = 1;
    } else if (this.currentPlayerIndex === 1) {
      this.currentPlayerIndex = 0
    };
  },

  currentPlayer: function(){
    return this.players[this.currentPlayerIndex];
  },

  init: function(players){
    for (var player of players) {
      this.players.push(
        new Player(
          player.symbol,
          player.name,
          player.id,
          player.number
        )
      );
    }
  },

  hasWinner: function (){
    groups = getAllCellGroups();

    for( var group of groups ) {
      if ( findPossibleWinner(group) ) {
        return true;
      }
    }
  },

  endGame: function() {
    // $('.container').html('WINNER: ' + this.currentPlayer().name + '!');
    console.log(window.location);
    $.ajax({
      url: window.location.href,
      type: 'PUT',
      dataType: 'json',
      data: {winner: this.currentPlayer()}
    })
    .done(function(response) {
      console.log(response);
    });

  }
}; //End var game

function Player(gameSym, name, id, playerNum){
  this.gameSym = gameSym;
  this.name = name;
  this.id = id;
  this.playerNum = playerNum;
};

Player.prototype.isTurn = function(){
  // Re-eval this logic
  return (game.currentPlayer() === this);
};

function findPossibleWinner($element) {
  // I don't really like my solution here at all for this method. I'll try to refactor if I feel
  // a need to do so later on.
  return (
    $($element[0]).html() &&
    $($element[1]).html() &&
    $($element[2]).html() &&
    $($element[0]).html() == $($element[1]).html() &&
    $($element[1]).html() == $($element[2]).html()
  )
}

function getAllCellGroups(){
  return [
    $('.col0'), $('.col1'), $('.col2'),

    $('.row0'), $('.row1'), $('.row2'),

    $('.diag0'), $('.diag1')
    ]
}

$(document).ready(function(){

  var players = [ { symbol: 'X', name: 'T', id: 1, number: 1 } ]
  players.push( { symbol: 'O', name: 'J', id: 2, number: 2 } )
  game.init(players)
  game.play();

  $('.cell').on('click', game.hasWinner);
});
