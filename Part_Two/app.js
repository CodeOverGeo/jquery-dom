//Create a array to hold list of movies and ratings
let movieList = [];
//create a placeholder for id to be able to identify which
//movie to remove from list
let count = 0;

//get values from form and add values to array
function addValuesToArray() {
  const movie = $('#movie').val();
  const rating = $('#rating').val();
  //only accept a movie if the movie length is greater than 2 and
  //a rating has been submitted
  if (movie.length < 2 || rating === '') {
    return;
  }
  movieList.push({ movie: movie, rating: rating, id: count });
  //add to the count, so each object in the array has a unique id
  count++;
  //clear the form
  $('#movie').val('');
  $('#rating').val('');
}

//build the html table using the values from the array
function buildTable(arr) {
  $('.table-body').empty('');
  for (let i = 0; i < arr.length; i++) {
    const row = `<tr>
      <td >${arr[i].movie}</td>
      <td data-id=${arr[i].id}>${arr[i].rating}</td>
      <td class="x">X</td>
      </tr>`;
    $('.table-body').append(row);
  }
}

$('#form').on('submit', function (e) {
  //stop the submit button from submitting
  e.preventDefault();
  addValuesToArray();
  buildTable(movieList);
});

$('#movie-list').on('click', '.x', function () {
  //find the clicked 'x' movie on the array and remove it
  for (let i = 0; i < movieList.length; i++) {
    if (movieList[i].id == $(this).prev().data('id')) {
      movieList.splice(i, 1);
    }
  }
  //remove the parent from the dom
  $(this).parent().remove();
});

$('th').on('click', function () {
  const column = $(this).data('column');
  const order = $(this).data('order');
  let header = $(this).html();
  header = header.substring(0, header.length - 1);
  //if data attr of order is desc, reverse and vice versa
  if (order == 'desc') {
    $(this).data('order', 'asc');
    //if its a movie sort, sort alphabetically, number sort, sort by subtracting
    if (column == 'movie') {
      movieList = movieList.sort((a, b) => (a[column] > b[column] ? 1 : -1));
    } else {
      movieList = movieList.sort((a, b) => b[column] - a[column]);
    }
    //toggle the up/down arrow to match asc or desc
    header += '&#9660';
  } else {
    $(this).data('order', 'desc');
    if (column == 'movie') {
      movieList = movieList.sort((a, b) => (a[column] < b[column] ? 1 : -1));
    } else {
      movieList = movieList.sort((a, b) => a[column] - b[column]);
    }
    header += '&#9650';
  }
  //drop the column title and arrow back on the DOM
  $(this).html(header);
  //rebuild the table using the new sorted movie list
  buildTable(movieList);
});
