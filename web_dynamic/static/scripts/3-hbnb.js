$(document).ready(frontend);
// Functions to execute when the document is loaded
function frontend () {
  getChecks();
  getStatus();
  displayPlaces();
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

// Display places according the post request
function displayPlaces () {
  const request = $.ajax({
    method: 'POST',
    data: JSON.stringify({}),
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    contentType: 'application/json'
  });
  request.done(function (places) {
    for (const place of places) {
      const article = $('<article></article>');
      const titleBox = createTitleBox(place.name, place.price_by_night);
      const informationBox = createInformationBox(place.max_guest, place.number_rooms, place.number_bathrooms);
      const user = createUser(place.user_id);
      const description = createDescription(place.description);

      article.append(titleBox, informationBox, user, description);
      $('section.places').append(article);
    }
  });
}

/* ----- DIVs of each article ----- */

// 1° DIV
function createTitleBox (name, price) {
  const titleBox = $('<div class="title_box"></div>');
  const namePlace = $('<h2></h2>').text(name);
  const pricePlace = $('<div class="price_by_night"></div>').text(price);
  return (titleBox.append(namePlace, pricePlace));
}
// 2° DIV
function createInformationBox (guests, rooms, bathrooms) {
  const informationBox = $('<div class="information"></div>');
  const content = (number, noun) => {
    const plural = number !== 1 ? 's' : '';
    return (number + noun + plural);
  };
  const maxGuest = $('<div class="max_guest"></div>').text(content(guests, ' Guest'));
  const numberRooms = $('<div class="number_rooms"></div>').text(content(rooms, ' Bedroom'));
  const numberBath = $('<div class="number_bathrooms"></div>').text(content(bathrooms, ' Bathroom'));
  return (informationBox.append(maxGuest, numberRooms, numberBath));
}
// 3° DIV 
function createUser (idUser) {
  const user = $('<div class="user"></div>');
  const request = $.getJSON('http://127.0.0.1:5001/api/v1/users/' + idUser);
  request.done(({ first_name, last_name }) => user.append('<b>Owner: </b>' + first_name + ' ' + last_name));
  return (user);
}
// 4° DIV
function createDescription (description) {
  return ($('<div class="description"></div>').text(description));
}
