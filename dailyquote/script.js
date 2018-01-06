$(document).ready(function(){
	const L_BIG_SCREEN = 300
	const L_MEDIUM_SCREEN = 250
	const L_SMALL_SCREEN = 100

	getQuoteFromQOD()

	// Register Event Listeners
	$("#new-quote").on("click", getQuoteFromQOD);
	// Not in use (but it reads an XML file and populates HTML elements)
	$('#project-details').on('click', getProjectDescription)


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

				// resolve length of the quote to display depending on the screen size
				displayQuote(result)
			},
			cache: false
		});
	}

	function displayQuote(result){
		// TODO: media query for tablets and iPads (landscape orientation)
		// const mq = window.matchMedia( "(max-width: 740px)" );
		// if (mq.matches){}

		if (result.quote.length <= L_MEDIUM_SCREEN){
			updateUI(result)
		}else{
			location.reload()
		}

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

// Not working as of Dec 2017
// they need to update their SSL certificate!
// another source: http://forismatic.com/en

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
});