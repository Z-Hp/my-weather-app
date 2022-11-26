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
let minute = now.getMinutes();
let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${currentDay} ${hour}:${minute}`;
if (minute < 10) {
  currentDate.innerHTML = `${currentDay} ${hour}:0${minute}`;
} else {
  currentDate.innerHTML = `${currentDay} ${hour}:${minute}`;
}
/////////////////////Getting Real Temperature///////////////////////////
/////////////////////////////////////////////////////////
// 🕵️‍♀️Feature #2
function displayWeather(response) {
  console.log(response.data);

  celsiusTemperature = response.data.main.temp;

  let city = response.data.name;
  let temprature = Math.round(response.data.main.temp);
  let status = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let iconUrl = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

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
}

function getCityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = "108638f7df202bc94b9e7938bce3ef76";
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let city = "New York";
let apiKey = "108638f7df202bc94b9e7938bce3ef76";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCityName);

/////////////////////////// Current Location Button /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "108638f7df202bc94b9e7938bce3ef76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);
////////////////////////////////////////////////////////////////////////////////////////////

// 🙀Unit change Feature
function changeToFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("deactive");
  celsiusLink.classList.remove("deactive");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function changeToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("deactive");
  fahrenheitLink.classList.remove("deactive");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);
