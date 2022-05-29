$(document).ready(frontend);
// Functions to execute when the document is loaded
function frontend () {
  getChecks();
  getStatus();
}

// Listen for change on each input checkbox tag and update the h4 tag inside the div Amenities with the list of Amenities checked
function getChecks () {
  $('.amenities input').change(function () {
    const amenities = {};
    $('.amenities input:checked').each(function () {
      amenities[$(this).data('id')] = $(this).data('name');
    });
    const names = Object.values(amenities).join(', ');
    $('.amenities h4').text(names);
  });
}

// Change the color of the circule according the API status
function getStatus () {
  $.getJSON('http://127.0.0.1:5001/api/v1/status/', ({ status }) => {
    if (status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
}
