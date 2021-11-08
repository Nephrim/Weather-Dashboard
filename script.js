/*api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}*/
var API = "44dd3318a97aca6fb46d6d25300a3cbb"
const form = document.querySelector("#search-weather");
const recentSearches = document.querySelector("#recent-searches");
const weatherLocation = document.querySelector("#weather-location");
const apiKey = "8a1171e41042abbcdc90a6804e77b204";
const history = document.querySelector("#recent-searches");
const searchHistory = JSON.parse(localStorage.getItem("search")) || [];
const onecallEndpoint =
  "https://api.openweathermap.org/data/2.5/onecall?&units=imperial&";
const geoEndpoint =
  "https://api.openweathermap.org/geo/1.0/direct?&units=imperial&";
const currentTemp = document.querySelector("#current-temp");
const currentWind = document.querySelector("#current-wind");
const currentHumidity = document.querySelector("#current-humidity");
const currentUV = document.querySelector("#current-uv");

function getWeatherbyCityName(city) {
  let params = new URLSearchParams({ q: city, appid: apiKey });
  fetch(geoEndpoint + params)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      const lat = data[0].lat;
      const lon = data[0].lon;
      const cityName = data[0].name;
      let params = new URLSearchParams({
        lat: lat,
        lon: lon,
        appid: apiKey,
      });
      console.log(lat, lon, cityName);
      weatherLocation.textContent = cityName + " " + today;

      return fetch(onecallEndpoint + params);
    })
      .then((response) => response.json())
      .then(function (weatherData) {
        console.log(weatherData)
        const temp = weatherData.current.temp;
        const humidity = weatherData.current.humidity;
        const wind = weatherData.current.wind_speed;
        const uv = weatherData.current.uvi;
        currentTemp.textContent = "Temp: " + temp + "℉";
        currentHumidity.textContent = "Humidity: " + humidity + "%";
        currentWind.textContent = "Wind: " + wind + "MPH";
        currentUV.textContent = "UV: " + uv;
        if (uv <= 2) {
          document.getElementById("current-uv").style.backgroundColor = "green"
        }
        else if (uv <= 5) {
          document.getElementById("current-uv").style.backgroundColor = "yellow"
        }
        else {
          document.getElementById("current-uv").style.backgroundColor = "darkred";
        }
      })
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const city = document.querySelector("input#city-name").value.trim();
  localStorage.setItem("city", city);
  if (city === "") {
    sendAlert();
  } else var button = document.createElement("button");
  button.textContent = city;
  history.appendChild(button);
  function sendAlert() {
    alert("Your city name is invalid");
  }
  getWeatherbyCityName(city);
  // fetch(onecallEndpoint + params).then(function (response) {
  //   console.log(response);
  // });
  var displayWeather = function (data, city) {

  };
});
recentSearches.addEventListener("click", function (e) {
  const target = e.target;
  if (!target.matches("button")) return;
});
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;