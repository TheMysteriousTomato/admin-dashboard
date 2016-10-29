$('table').on('click', 'tbody > tr', function() {
  var ticketId = $(this).data("id");

  $.ajax({
    url: '_task.html',
    error: function() {
      $('#ticketView .modalBody').html('<p>An error has occurred</p>');
    },
    success: function(data) {
      $('#taskView .modal-body').html(data);
      $('#taskView').modal('show');
    },
    type: 'GET'
  })

});
