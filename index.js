var lat;
var lon;
var weatherUrl;
var locationObj;
var locationText = document.getElementById('location');
var icon = document.getElementById('icon');
var description = document.getElementById('description');
var tempDisplay = document.getElementById('temp');
var tempDeg = document.getElementById('tempDeg');
var temp;
var cels;
var fahren;
var currentTemp = 'celsius';
var domObj;
var loading = document.getElementById('loading');
var id;

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
  weatherPic(domObj);
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
  id = (obj.weather[0].id);
  console.log(id);
  var pic;
  if (id === 800) {
    pic = 'sunny';
  } else if (id > 199 && id < 233) {
    pic = 'thunder';
  } else if (id > 299 && id < 322) {
    pic = 'drizzle';
  } else if (id > 499 && id < 532) {
    pic = 'rain';
  } else if (id > 600 && id < 623) {
    pic = 'snow';
  } else if (id > 700 && id < 782) {
    pic = 'atmosphere';
  } else if (id > 800 && id < 805) {
    pic = 'clouds';
  }

  switch (pic) {
    case 'sunny':

      icon.className = "fa fa-sun-o fa-5x";
      break;

    case 'clouds':
      icon.className = "fa fa-cloud fa-5x";
      break;

    case 'thunder':
      icon.className = "fa fa-bolt fa-5x";
      break;

    case 'rain':
      icon.className = "fa fa-tint fa-5x";
      break;

    case 'drizzle':
      icon.className = "fa fa-tint fa-5x";
      break;

    case 'snow':
      icon.className = "fa fa-snowflake-o fa-5x";
      break;

    case 'atmosphere':
      icon.className = "fa fa-cloud fa-5x";
      break;

    default:
      console.log("no weather");
  }

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
