$(document).ready(function(){
  getQuote();
  $("#new-quote").on("click", getQuote);
});

function getQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "UOfZLUoKknmshU12Rno8tdipdLybp1sZ78yjsn8aW1MogaaK1U",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=movies',
    success: function(r) {
      $("#quote-txt").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);

          var innerHTML = "<i class='fa fa-quote-left'></i>" + r.quote + "<i class='fa fa-quote-right'></i>";
          $('#quote-txt').html(innerHTML);
        });

      $(".quote-author").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#author').html("- " + r.author);
        });

      /*var color = Math.floor(Math.random() * colors.length);
      $("html body").animate({
        backgroundColor: colors[color],
        color: colors[color]
      }, 1000);
      $(".button").animate({
        backgroundColor: colors[color]
      }, 1000);*/
    }
  });
}
