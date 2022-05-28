// Listen for change on each input checkbox tag and update the h4 tag inside the div Amenities with the list of Amenities checked
$(document).ready(getChecks);

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
