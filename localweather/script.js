// METHOD using http
$(function(){
    var temp_f, temp_c, desc, humidity;

    // choose a background image
	randomBackground();

    // get location
    $.getJSON("http://ip-api.com/json/?callback=?", function(data) {
        var city = "";
        $.each(data, function(k, v) {
            //console.log(k + ", " + v)
            if (k=== 'city'){
                city = v
            }
        });

        var url = "http://api.openweathermap.org/data/2.5/weather?"
        var loc_param   = "q=" + city;
        var units       = "&units=metric"
        var appid_param = "&APPID=f09e057a05dc58c17d7baca4f36ab8d5";
        var weatherAPICall = url + loc_param + units + appid_param;

        // get weather
        $.getJSON(weatherAPICall).done(function(data) {
            $('#spinner').hide();
	        $('#warning').hide();

            desc = data.weather[0].main;
            humidity = data.main.humidity;
            temp_c = Math.round(data.main.temp);
            temp_f = Math.round( (temp_c * 9)/5 + 32 );

            $("#location").html("<h3> " + city + "</h3>" );
            $("#temprature").html("<h3>" + temp_c + " &deg;<a id='centi'>C</a></h3>");
            $("#description").html("<h3>" + desc + "</h3>");
            $('#' + desc.toLowerCase()).show();

            $("#centi").on("click", toFah);

        });

    });
    function toFah(){
        $("#temprature").html("<h3>" + temp_f + " &deg;<a id='fah'>F</a></h3>")
        $("#fah").on("click", toCenti);
    }

    function toCenti(){
        $("#temprature").html("<h3>" + temp_c + " &deg;<a id='centi'>C</a></h3>")
        $("#centi").on("click", toFah);
    }

	function randomBackground(){
    	var imgArray  = ["sun.jpg", "fog.jpg", "rain.jpg", "snow.jpg"]
		var randomNum = Math.floor(Math.random() * 4)
		var randomImg = imgArray[randomNum]

		$("body").css('background-image', 'url(' + randomImg + ')')
	}
});