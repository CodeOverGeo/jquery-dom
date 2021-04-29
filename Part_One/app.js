$(document).ready(function () {
  console.log("Let's get ready to party with jQuery!");
});

$('img').addClass('image-center');

$('p:nth-last-child(1)').remove();

const randNum = Math.floor(Math.random() * 100) + 1;

$('h1').css('font-size', randNum + 'px');

$('ol').append('<li>But cats are better</li>');

$('aside').html('<p>Profusely apologize for list</p>');

$('input').on('change', function () {
  $('body').css(
    'background-color',
    `rgb(${$('input').eq(0).val()}, ${$('input').eq(2).val()}, ${$('input')
      .eq(1)
      .val()})`
  );
});

$('img').on('click', function () {
  $(this).remove();
});
