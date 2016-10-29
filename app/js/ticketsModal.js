$('table').on('click', 'tbody > tr', function() {
  var ticketId = $(this).data("id");

  $.ajax({
    url: '_ticket.html',
    error: function() {
      $('#ticketView .modalBody').html('<p>An error has occurred</p>');
    },
    success: function(data) {
      $('#ticketView .modal-body').html(data);
      $('#ticketView').modal('show');
    },
    type: 'GET'
  })

});
