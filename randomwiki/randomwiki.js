$(function(){
	$("#search-btn").on("click", function(){
		// hide the search button
		$(this).hide();
		// show the search-text

		$("#type-search").show({ effect: "scale"});
		$("#type-search").focus();

	})

	// wiki search
	// https://www.mediawiki.org/wiki/API:Main_page
	// https://www.w3schools.com/jquery/ajax_get.asp

	$("#type-search").keypress(function(e){
		var key = e.which;
		if (key == 13){
			const searchTxt = $("#type-search").val();
			const N  = 10;
			const url = "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrnamespace=0" +
				"&gsrlimit=" + N + "&prop=info|extracts&inprop=url&format=json&gsrsearch=" + searchTxt+
				"&exlimit=max&exintro&continue&exchars=1000&callback=?"
			$.getJSON(url,processResult);

			function processResult(data){
				var pages= data.query.pages;

				$.each(pages, function(i, item){
					// move the search area to the top
					$('#wiki-search').removeClass('wiki')
					$('#wiki-search').addClass('wiki-top')
					$('#search-box').addClass('search-box-top')
					$('#search-msg').html(N + " Results returned for your search term '" + searchTxt + "'")

					// display results
					$('#wiki-results').show()

					// create new div for each result
					const excerpt =  item.extract.split("</p>")[0]
					const wikiResult = document.createElement("div")
					const title = document.createElement("div")
					const extract = document.createElement("div")
					const footer = document.createElement("div")
					const fullURL = document.createElement("div")
					const lastEdited = document.createElement("div")
					const hr = document.createElement("hr")

					wikiResult.appendChild(title)
					wikiResult.appendChild(extract)
					wikiResult.appendChild(footer)
					wikiResult.appendChild(footer)

					footer.appendChild(fullURL)
					footer.appendChild(lastEdited)
					footer.appendChild(hr)

					// give css style
					title.className = "wiki-title"
					footer.className= "wiki-footer"
					extract.className = "wiki-result"

					// populate with data
					title.innerHTML     ="<h3>" + item.title + "</h3>"
					extract.innerHTML   =excerpt + "</p>"
					fullURL.innerHTML   ="URL: <a href='" + item.fullurl + "'>" + item.fullurl + "</a>"
					lastEdited.innerHTML="Last Edited: " + item.touched

					// add to dom
					$('#wiki-results').append(wikiResult)


				})
			}
		}
	});


});
