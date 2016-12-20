var Form = {
  submitForm: function(e){
    e.preventDefault();
    var data = $(this).serialize();
    // Bind this so I can still access the form that got the request
    Form.sendFormToServer.bind(this)(data);
  },

  sendFormToServer: function(data){
    $.ajax({
      url: this.action,
      type: this.method,
      data: data
    })
    .done(function(response) {
      if (response.redirect){
        window.location.replace(response.url);
      };
    })
    .fail(function(response) {
      $('#form-catcher').html(response.responseText);
    });
  },

  getForm: function(e){
    e.preventDefault();

    Form.fetchUserForm.bind(this)();
  },

  fetchUserForm: function(){
    $.ajax({
      url: this.href
    })
    .done(function(form) {
      $('#form-catcher').html(form);
    });
  }
}

function Board (){
  this.init = function(){

  }
}

function placePieceOnBoard (e) {
  var activePlayer = { piece: 'X' }
  $(this).html(activePlayer.piece);
}

$(document).ready(function() {
  // Should this be written as 'div#form-catcher' if there's only one form-catcher on the page?
  var $formCatcher = $('#form-catcher');

  // This listener handles login and registration forms (one posts to sessions/new the other users/new)
  $formCatcher.on('click', '#get-form', Form.getForm)
  .on('submit', '#new', Form.submitForm);

  $('.container').on('click', '.lobby-link', );

  $('#game-board').on('click', '.cell', placePieceOnBoard);


});
