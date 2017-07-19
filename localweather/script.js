// METHOD 1 (http)
$(function(){
    var temp_f, temp_c, desc, humidity;

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
        //console.log(weatherAPICall)

        // get weather
        $.getJSON(weatherAPICall).done(function(data) {
            $('#spinner').hide();

            //console.log(data);
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


});


/*
 $(function(){
 var temp_f, temp_c, desc, humidity;

 // get location
 if (navigator.geolocation){
 navigator.geolocation.getCurrentPosition(function(position){
 // reverse geocoding
 //http://maps.google.cn/maps/api/geocode
 //https://maps.googleapis.com/maps/api/geocode
 var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
 position.coords.latitude + '%2C' +
 position.coords.longitude + '&language=en';

 $.getJSON(GEOCODING).done(function(location) {
 var city = location.results[0].address_components[2].long_name;

 // Get Weather (https://www.programmableweb.com/news/top-10-weather-apis/analysis/2014/11/13)
 var url = "http://api.openweathermap.org/data/2.5/weather?"
 var loc_param   = "q=" + city;
 var appid_param = "&APPID=f09e057a05dc58c17d7baca4f36ab8d5";
 var weatherAPICall = url + loc_param + appid_param;

 console.log(weatherAPICall)
 $.getJSON(weatherAPICall).done(function(data) {
 console.log(data);
 desc = data.weather[0].main;
 humidity = data.main.humidity;
 temp_c = Math.round(data.main.temp/10);
 temp_f = Math.round( (temp_c * 9)/5 + 32 );
 $("#temprature").html("<h3>" + temp_c + " &deg;<a id='centi'>C</a></h3>")

 $("#description").html("<h3>" + desc + "</h3>")
 $("#centi").on("click", toFah);

 });

 function toFah(){
 $("#temprature").html("<h3>" + temp_f + " &deg;<a id='fah'>F</a></h3>")
 $("#fah").on("click", toCenti);
 }

 function toCenti(){
 $("#temprature").html("<h3>" + temp_c + " &deg;<a id='centi'>C</a></h3>")
 $("#centi").on("click", toFah);
 }

 $("#location").html("<h3> " + city +
 "</h3> (" + position.coords.latitude +
 ", " + position.coords.longitude +
 ")");

 });
 });
 }

 // icons
 //for icons:
 // https://erikflowers.github.io/weather-icons
 // https://cdnjs.com/libraries/weather-icons


 // animate the icon
 $("#icon").animate({rotate: '30deg'},1000);

 });*/