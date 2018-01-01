$(document).ready(function(){
	//getQuoteFromAndruxnet()

	getQuoteFromQOD()

	// Register Event Listeners
	$("#new-quote").on("click", getQuoteFromQOD);
	// Not in use (but it reads an XML file and populates HTML elements)
	$('#project-details').on('click', getProjectDescription)
});

function getQuoteFromQOD(){
	const httpsPreamble = "https://cors-anywhere.herokuapp.com/"
	$.ajax( {
		url: httpsPreamble + 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
		success: function(data) {
			var post = data.shift(); // The data is an array of posts. Grab the first one.
			var content = post.content
			// remove the <p> and </p>
			var quote = content.substr(3, content.length -8)
			var result = {quote: quote, author: post.title}

			updateUI(result)
		},
		cache: false
	});

}
function getQuoteFromAndruxnet() {
	$.ajax({
		headers: {
			"X-Mashape-Key": "UOfZLUoKknmshU12Rno8tdipdLybp1sZ78yjsn8aW1MogaaK1U",
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		},
		url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=movies',
		success: function(result) {
			updateUI(result)
		}
	});
}

function updateUI(result){
	// static content (if needed)
	var quote = "When you realize you want to spend the rest of your life with somebody, " +
		"you want the rest of your life to start as soon as possible."
	var author = "When Harry Met Sally, 1989"

	$("#quote-txt").animate({opacity: 0}, 500, function() {
		$(this).animate({opacity: 1}, 500);
		var innerHTML = "<i class='fa fa-quote-left'></i> " + result.quote + "<i class='fa fa-quote-right'></i>";
		$('#quote-txt').html(innerHTML);
	});

	$("#quote-author").animate({opacity: 0}, 500, function() {
		$(this).animate({opacity: 1}, 500);
		$('#author').html("- " + result.author);
	});
}

function getProjectDescription(){
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
}
