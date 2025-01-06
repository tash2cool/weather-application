function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let cityHeader = document.querySelector("#city-header");
  cityHeader.innerHTML = city.value;
}
let cityForm = document.querySelector("#search-city");
console.log(cityForm);
cityForm.addEventListener("submit", updateCity);
