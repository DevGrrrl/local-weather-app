var lat;
var lon;
var weatherUrl;
var locationObj;
var locationText = document.getElementById('location');
var icon = document.getElementById('icon');
var image = document.getElementById('image');
var description = document.getElementById('description');
var tempDisplay = document.getElementById('temp');
var tempDeg = document.getElementById('tempDeg');
var temp;
var cels;
var fahren;
var currentTemp = 'celsius';
var domObj;
var loading = document.getElementById('loading');

//eventListener

function eventListener() {
  tempDeg.addEventListener('click', function() {
    if (currentTemp === 'celsius') {
      currentTemp = 'fahren';
      tempfahren(temp);
    } else {
      currentTemp = 'celsius';
      tempCels(temp);
    }
  });

}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    loaderOn();
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

getLocation();

function loaderOn() {
  loading.className = 'loading';
}

function loaderOff() {
  loading.className = "";
}

function domManip(obj) {
  domObj = obj;
  locationText.innerText = domObj.name + ", " + domObj.sys.country;
  description.innerText = domObj.weather[0].description;
  getTemp(domObj);
  // weatherPic(domObj);
};

function getTemp(obj) {
  temp = Math.round(obj.main.temp);
  tempCels(temp);
}

function tempCels(val) {
  tempDeg.innerText = "\xB0C";
  cels = val;
  tempDisplay.innerText = cels;
}

function tempfahren(val) {
  tempDeg.innerText = "\xB0F";
  fahren = Math.round(val * 9 / 5 + 32);
  tempDisplay.innerText = fahren;

}

function weatherPic(obj) {
  var weather = (domObj.weather[0].icon);
  image.src = weather;
  // icon.className = "wi wi-" + weather;
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  weatherUrl = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      locationObj = JSON.parse(xhr.responseText);
      domManip(locationObj);
      eventListener();
      loaderOff();

    }

  };

  xhr.open("GET", weatherUrl, true);
  xhr.send();

}
