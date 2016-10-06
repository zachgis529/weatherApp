$(document).ready(function() {

$.getJSON('http://ipinfo.io', function(data){
  var city = data.city;
  var region = data.region;
  var country = data.country;
  var zipcode = data.postal;
  var loc = data.loc;

  var getWeather = function(){
	var url = "HTTP://api.openweathermap.org/data/2.5/weather?zip="+zipcode+",us&APPID=2b16187d82ecabb9d5259af118f91199";
	var mapUrl = "https://www.google.com/maps/embed/v1/view?key=AIzaSyCrgH1YBfVDLiYmIMPhaD34YtMqOTU9xcg&center="+loc+"&zoom=14"
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

	    return hours+":"+mins;
	  }

	  
	  $(".one").append("<div class = 'text-container'><p>"+tempF+"&degF</p></div>");
	  $(".two").append("<div class = 'text-container'><i class = 'wi wi-owm-"+weatherId+"'></i></div>");
	  $(".three").append("<div class = 'text-container'><p>"+windSpeed+"mph<i class = 'wi wi-wind towards-"+windAngle+"-deg'></i></p></div>");
	  $(".four").append("<div class = 'text-container'><p>"+getTime()+"</p></div>");
	  $("#circle-big").append("<iframe src="+mapUrl+"></iframe>");

	  
	  /*$("#temp").append("<p>"+tempF+"</p>");
	  $("#container").append("<p>"+tempC+"</p>");
	  $("#container").append("<p>"+weather+"</p>");
	  $("#container").append("<p>"+description+"</p>");*/
      })
	}

  getWeather();
})


//get weather info
//insert state outline and weather icons
});