

$(document).ready(function() {

$.getJSON('http://ipinfo.io', function(data){
  var city = data.city;
  var region = data.region;
  var country = data.country;
  var zipcode = data.postal;
  var lnglat = data.loc.split(",");
  var lat = parseFloat(data.loc.split(",")[0]);
  var lng = parseFloat(data.loc.split(",")[1]);

  /*map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(lat, lng),
    zoom: 12,
    disableDefaultUI: true
    }); */

  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      new ol.layer.Tile({
        source: new ol.source.XYZ({
      	  url: "http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png"
        })
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([lng, lat]),
      zoom: 12
    })
  });


  var getWeather = function(){
	var url = "HTTP://api.openweathermap.org/data/2.5/weather?zip="+zipcode+",us&APPID=2b16187d82ecabb9d5259af118f91199";
	$.getJSON(url, function(weather_data){
	  var tempF = Math.floor((((weather_data.main.temp)*9)/5)-459.67);
	  var tempC = Math.floor(weather_data.main.temp - 273.15);
	  var windSpeed = ((weather_data.wind.speed)*2.23694).toFixed(2);
	  var windAngle = Math.floor(weather_data.wind.deg);
	  var weatherId = weather_data.weather[0].id;
      
      

	  var getTime = function(){
	  	var date = new Date();
	    var hours = date.getHours();
	    var mins = date.getMinutes();

	    if (mins < 10){
	    	mins = ('0' + mins);
	    }

	    return hours+":"+mins;
	  }

	  
	  $(".one").append("<div class = 'text-container'><p>"+tempF+"&degF</p></div>");
	  $(".two").append("<div class = 'text-container'><i class = 'wi wi-owm-"+weatherId+"'></i></div>");
	  $(".three").append("<div class = 'text-container'><p>"+windSpeed+"mph<i class = 'wi wi-wind towards-"+windAngle+"-deg'></i></p></div>");
	  $(".four").append("<div class = 'text-container'><p>"+getTime()+"</p></div>");

      })
	}

  getWeather();
})
});

