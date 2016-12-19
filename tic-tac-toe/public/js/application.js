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
  }
}

$(document).ready(function() {
  // Should this be written as 'div#form-catcher' if there's only one form-catcher on the page?
  $('#form-catcher').on('submit', '#new', Form.submitForm)
});

