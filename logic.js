
// var x = document.getElementById("demo");
var lat;
var lon;
var weatherUrl;
var locationText = document.getElementById('location');
var icon = document.getElementById('icon');
var description = document.getElementById('description');
var temp = document.getElementById('temp');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert ("Geolocation is not supported by this browser.");
    }
}

getLocation();


function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    weatherUrl = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" +lon;
    var locationObj;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
      locationObj = JSON.parse(xhr.responseText);
      locationText.innerText = locationObj.name + ", " + locationObj.sys.country;
      description.innerText = locationObj.weather[0].main;
      temp.innerText = locationObj.main.temp + "\xB0";
      // icon.src = locationObj.weather[0].icon;

      }

    };
    xhr.open("GET", weatherUrl, true);
    xhr.send();

}

// parallelFunction1();

//
// showPosition();

// var weatherUrl = "https://fcc-weather-api.glitch.me/api/current?lon=:" + long + "&lat=:" + lat;

// function getWeather(url,cb) {
//
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//     weatherObj = JSON.parse(xhr.responseText);
//
//     //cb below is callback (function(image) on line 124 above)
//
//     cb();
//     }
//
//   };
//   xhr.open("GET", url, true);
//   xhr.send();
// }
//   //
  // parallelFunction2(getWeather, ?, url);
// }
