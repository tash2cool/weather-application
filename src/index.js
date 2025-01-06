//updates the HTML elements of current city and current weather conditions
function updateWeather(response) {
  let cityHeader = document.querySelector("#city-header");
  cityHeader.innerHTML = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let temperatureHeader = document.querySelector("#current-temperature");
  temperatureHeader.innerHTML = temperature;
  let wind = Math.round(response.data.wind.speed);
  let windHeader = document.querySelector("#wind");
  windHeader.innerHTML = wind;
  let humidityHeader = document.querySelector("#humidity");
  humidityHeader.innerHTML = response.data.temperature.humidity;
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
}
//variables to update city header
let cityForm = document.querySelector("#search-city");
console.log(cityForm);
cityForm.addEventListener("submit", updateCity);
//variables for API
let apiKey = "7ae0d3164bde28fe1dababf583380ot9";
let city = "Montreal";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
axios.get(apiUrl).then(updateWeather);
