$(function(){
	var city, temp_f, temp_c, desc, humidity;

	// choose a background image
	randomBackground()

	// determine if its http or https
	if (window.location.protocol == "https:") {
		callHttpsMethod()
	}
	else{
		callHttpsMethod()
	}

	function callHttpMethod(){
		console.log("HTTP method")
		$.getJSON("http://ip-api.com/json/?callback=?", function(data) {
			$.each(data, function(k, v) {
				//console.log(k + ", " + v)
				if (k=== 'city'){
					city = v
					return false    // exit the loop
				}
			});

			var httpURL     = "http://api.openweathermap.org/data/2.5/weather?"
			var loc_param   = "q=" + city
			getWeather(httpURL, loc_param)
		});
	}

	function callHttpsMethod(){
		console.log("HTTPs method")
		if ("geolocation" in navigator) {
			var watchID = navigator.geolocation.watchPosition(
				function(position) {
					// success
					getCity(position.coords.latitude, position.coords.longitude)
				},
				function(){
					// error
				},
				{timeout: 10000, enableHighAccuracy: false} // options
			);
		} else {
			/* geolocation IS NOT available */
		}
	}

	function getCity(lat, lng){
		var latlng = new google.maps.LatLng(lat, lng)
		var geocoder = new google.maps.Geocoder()
		geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					city = results[1].address_components[1].long_name

					var httpsURL    = "https://api.openweathermap.org/data/2.5/weather?"
					var loc_param   = "q=" + city
					getWeather(httpsURL, loc_param)
				}
			}
		})


	}
	function getWeather(url, location){
		var units       = "&units=metric"
		var appid_param = "&APPID=f09e057a05dc58c17d7baca4f36ab8d5";
		var weatherAPICall = url + location + units + appid_param;

		// get weather
		$.getJSON(weatherAPICall).done(function(data) {
			desc = data.weather[0].main;
			humidity = data.main.humidity;
			temp_c = Math.round(data.main.temp);
			temp_f = Math.round( (temp_c * 9)/5 + 32 );

			updateUI()

		});
	}

	function updateUI(){
		$('#spinner').hide();
		$('#warning').hide();

		$("#location").html("<h3> " + city + "</h3>" );
		$("#temperature").html("<h3>" + temp_c + " &deg;<a id='centi'>C</a></h3>");
		$("#description").html("<h3>" + desc + "</h3>");
		$('#' + desc.toLowerCase()).show();
		$("#centi").on("click", toFah);
	}
	function toFah(){
		$("#temperature").html("<h3>" + temp_f + " &deg;<a id='fah'>F</a></h3>")
		$("#fah").on("click", toCenti);
	}

	function toCenti(){
		$("#temperature").html("<h3>" + temp_c + " &deg;<a id='centi'>C</a></h3>")
		$("#centi").on("click", toFah);
	}

	function randomBackground(){
		var imgArray  = ["sun.jpg", "fog.jpg", "rain.jpg", "snow.jpg"]
		var randomNum = Math.floor(Math.random() * 4)
		var randomImg = imgArray[randomNum]

		$("body").css('background-image', 'url(img/' + randomImg + ')')
	}
});