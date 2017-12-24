$(document).ready(function(){
	getQuote();
	$("#new-quote").on("click", getQuote);

	$('#project-details').on('click', function(){
		// read XML file
		$.ajax({
			type: "GET" ,
			url: "../portfolio/helpers/project-descriptions.xml" ,
			dataType: "xml" ,
			success: function(xml) {
				$(xml).find('project').each(function() {
					let project = {}

					project.name = $(this).find('name').text()
					project.desc = $(this).find('description').text()
					console.log(project)
				})
			}
		});

		// Populate a card
	})
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

					// todo: user r.quote instead when the certificate is aquired
					var quote = "When you realize you want to spend the rest of your life with somebody, " +
						"you want the rest of your life to start as soon as possible."
					var innerHTML = "<i class='fa fa-quote-left'></i>" + quote + "<i class='fa fa-quote-right'></i>";
					$('#quote-txt').html(innerHTML);
				});

			$("#quote-author").animate({
					opacity: 0
				}, 500,
				function() {
					$(this).animate({
						opacity: 1
					}, 500);
					var author = "When Harry Met Sally, 1989"
					$('#author').html("- " + author);
				});

		}
	});
}
