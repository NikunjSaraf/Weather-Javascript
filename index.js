const api = {
  key: "dd5866223ee1c090b8588052bb612078",
  base: "https://api.openweathermap.org/data/2.5/",
};

const search = document.querySelector(".search-box");
search.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode === 13) {
    getQuery(search.value);
  }
}

function getQuery(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
}

function displayResult(weather) {
  console.log(weather);
  let city = document.querySelector(".city");
  city.innerText = `${weather.name} , ${weather.sys.country}`;

  let now = new Date();

  let date = document.querySelector(".location .date");
  date.innerHTML = dateBuilder(now);
  let current = document.querySelector(".temp");
  current.innerHTML = `${weather.main.temp}`;

  let condition = document.querySelector(".weather");
  condition.innerHTML = `${weather.weather[0].main}`;

  let minMax = document.querySelector(".hi-low");

  minMax.innerHTML = `${weather.main.temp_max} / ${weather.main.temp_min}`;
}

function dateBuilder(d) {
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
