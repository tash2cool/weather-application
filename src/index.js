//updates the HTML elements of current city and current weather conditions
function updateWeather(response) {
  let cityHeader = document.querySelector("#city-header");
  cityHeader.innerHTML = `${response.data.city}, `;
  let countryHeader = document.querySelector("#country");
  countryHeader.innerHTML = response.data.country;
  let temperature = Math.round(response.data.temperature.current);
  let temperatureHeader = document.querySelector("#current-temperature");
  temperatureHeader.innerHTML = temperature;
  let wind = Math.round(response.data.wind.speed);
  let windHeader = document.querySelector("#wind");
  windHeader.innerHTML = `${wind} km/hr`;
  let humidityHeader = document.querySelector("#humidity");
  humidityHeader.innerHTML = `${response.data.temperature.humidity}%`;
  let details = document.querySelector("#weather-details");
  details.innerHTML = response.data.condition.description;
  let icon = document.querySelector("#weather-icon");
  icon.src = response.data.condition.icon_url;
}
//updates api url to the corresponding city that was searched
function updateUrl(city) {
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}
//once a city is searched, it invokes the update api url function
function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  city = city.value.trim();
  updateUrl(city);
  getForecast(city);
}
function setDate() {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let number = date.getDate();
  let hour = date.getHours();
  let setting;
  if (hour < 13) {
    setting = "am";
  } else {
    hour = hour - 12;
    setting = "pm";
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = date.getFullYear();
  let fullDate = `${day}, ${month} ${number}, ${year}`;
  let dateHeader = document.querySelector("#current-date");
  dateHeader.innerHTML = fullDate;
  let fullTime = `${hour}:${minutes} ${setting}`;
  let timeHeader = document.querySelector("#current-time");
  timeHeader.innerHTML = fullTime;
}
//formats the timestamp for the forecast and returns the day
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
//sets HTML for forecast days
function setDays(response) {
  console.log(response.data);
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="forecast-day">
            <div class="forecast-day-one">${formatDay(day.time)}</div>
            <img src=${
              day.condition.icon_url
            } alt="weather_icon" class="forecast-icon"/>
            <span class="forecast-high">${Math.round(
              day.temperature.maximum
            )}</span
            ><span class="forecast-low"> ${Math.round(
              day.temperature.minimum
            )}</span>
          </div>`;
    }
  });
  let forecast = document.querySelector(".forecast-container");
  forecast.innerHTML = forecastHTML;
}
//retrieves forecast data and sends it to function setDays which updates HTML with forecast data
function getForecast(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(setDays);
}
//variables to update city header
let cityForm = document.querySelector("#search-city");
cityForm.addEventListener("submit", updateCity);
//variables for API, sets the current data to Montreal
let apiKey = "7ae0d3164bde28fe1dababf583380ot9";
let city = "Montreal";
updateUrl(city);
getForecast(city);
//update the date
setDate();
