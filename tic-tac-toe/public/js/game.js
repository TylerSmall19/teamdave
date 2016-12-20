var game = {
  numPlayers: 2,

  playerTurn: 1,

  players: [],

  play: function(){
    $('#game-board').on('click', '.cell', this.placePiece.bind(this));
  },

  placePiece: function(e){
    cell = e.target
    $(cell).html(this.currentPlayer().gameSym);
  },

  currentPlayerIndex: 0,

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
  }
};

function Player(gameSym, name, id, playerNum){
  this.gameSym = gameSym;
  this.name = name;
  this.id = id;
  this.playerNum = playerNum;
};

Player.prototype.isTurn = function(){
  if (game.currentPlayer == this.playerNum){
    return true;
  } else {
    return false;
  }
};

$(document).ready(function(){
  // console.log(window.location)
  // $.ajax({

  // })
  // .done(function() {
  //   console.log("success");
  // });

  var players = [{symbol: 'X', name: 'T', id: 1, number: 1}]
  game.init(players)
  game.play();
});
