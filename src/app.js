//current time code

let apiKey = "a710bd8bd76400c9658ef649d9e81728";

//to overwrite h1
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    alert("Please type a city");
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let dateNumber = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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

  //calculate the date
  return `${day}, ${dateNumber} ${month} ${hour}:${minutes}`;
}

//weather description
function showTemp(response) {
  console.log(response.data);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;

  let weatherDesc = document.querySelector("#weather-description");
  weatherDesc.innerHTML = response.data.weather[0].main;

  //to access temperature
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${temperature} ℃`;

  let maxTemp = document.querySelector("#high");
  maxTemp.innerHTML = `${response.data.main.temp_max}`;

  let minTemp = document.querySelector("#low");
  minTemp.innerHTML = `${response.data.main.temp_min}`;

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${response.data.wind.speed}mph`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;
}

//overwriting fake temperature
function cityTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temperature");
  tempElement.innerHTML = `${response.data.main.temp}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&lon=${longitude}&lat=${latitude}&units=metric`;
  axios.get(apiUrl).then(currentCityWeather);
}

function currentCityWeather(response) {
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;

  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = `${temperature} ℃`;

  let weatherDesc = document.querySelector("#weather-description");
  weatherDesc.innerHTML = response.data.weather[0].main;

  let maxTemp = document.querySelector("#high");
  maxTemp.innerHTML = `${response.data.main.temp_max}`;
  let minTemp = document.querySelector("#low");
  minTemp.innerHTML = `${response.data.main.temp_min}`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${response.data.wind.speed}mph`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getPosition);

function searchCity(city) {
  let apiKey = "a710bd8bd76400c9658ef649d9e81728";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function handleSearch(event) {
  event.preventDefault();
  let cityValue = document.querySelector("#search-text-input");
  searchCity(cityValue.value);
}

//to convert celsius to fahrenheit
function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemp)} ℉`;
}

function showcelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${Math.round(celsiusTemp)} ℃`;
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showcelsiusTemp);
