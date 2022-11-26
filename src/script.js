// ⏰Feature #1
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${currentDay} ${hour}:${minute}`;

/////////////////////Getting Real Temperature///////////////////////////
/////////////////////////////////////////////////////////
// 🕵️‍♀️Feature #2
function displayWeather(response) {
  console.log(response.data);

  celsiusTemperature = response.data.temperature.current;

  let city = response.data.city;
  let temprature = Math.round(celsiusTemperature);
  let status = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let iconUrl = response.data.condition.icon_url;

  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let statusElement = document.querySelector("#status");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = temprature;
  statusElement.innerHTML = status;
  humidityElement.innerHTML = humidity;
  windSpeedElement.innerHTML = windSpeed;
  iconElement.setAttribute("src", iconUrl);
  iconElement.setAttribute("alt", status);

  getForecast(response.data.coordinates);
}

function getCityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiKey = "2fcafa1aefod01457ce321at38ddee0b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let city = "New York";
let apiKey = "2fcafa1aefod01457ce321at38ddee0b";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCityName);

/////////////////////////// Current Location Button /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2fcafa1aefod01457ce321at38ddee0b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);
////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// Forecast Feature //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img
          src=${forecastDay.condition.icon_url}
          alt=""
          width="60"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temperature.minimum
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2fcafa1aefod01457ce321at38ddee0b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
