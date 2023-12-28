function refreshWeather(response) {
    let currentCity = document.querySelector("#current-city");
    let currentCondition = document.querySelector("#current-condition");
    let currentHumidity = document.querySelector("#humidity");
    let currentWindSpeed = document.querySelector("#wind-speed");
    let currentTemperature = document.querySelector("#temp-value");
    let temperature = response.data.temperature.current;
    let currentTime = document.querySelector("#current-date");
    let cityDate = new Date(response.data.time * 1000);
    let iconUrl = response.data.condition.icon_url;
    let currentIcon = `<img src="${iconUrl}" />`;
    let iconElement = document.querySelector("#icon");
  
    currentCity.innerHTML = response.data.city;
    currentTime.innerHTML = formatDate(cityDate);
    currentCondition.innerHTML = `${response.data.condition.description}`;
    currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;
    currentWindSpeed.innerHTML = `${response.data.wind.speed} km/h`;
    currentTemperature.innerHTML = Math.round(temperature);
    iconElement.innerHTML = currentIcon;
  }
  
  function formatDate(cityDate) {
    let hours = cityDate.getHours();
    let minutes = cityDate.getMinutes();
    let day = cityDate.getDay();
    let weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    return `${weekDays[day]} ${hours}:${minutes},`;
  }
  
  function formatDay(timestamp) {
    let forecastDate = new Date(timestamp * 1000);
    let weekDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  
    return weekDays[forecastDate.getDay()];
  }
  function displayForecast(response) {
    let forecastHtml = "";
  
    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
        let forecastDay = formatDay(day.time);
        let dayIcon = day.condition.icon_url;
        let minTemp = Math.round(day.temperature.minimum);
        let maxTemp = Math.round(day.temperature.maximum);
  
        forecastHtml += `
          <div class="day-container">
            <div class="forecast-day">${forecastDay}</div>
            <div ><img src="${dayIcon}" class="forecast-icon"/></div>
            <div class="forecast-temp">
              <span class = "max-temp"><strong>${maxTemp}&deg</strong></span> 
              <span class = "min-temp">${minTemp}&deg</span>
        </div>
      </div>`;
      }
    });
  
    let weatherForecast = document.querySelector("#forecast-container");
    weatherForecast.innerHTML = forecastHtml;
  }
  
  function getWeatherForecast(city) {
    let apiKey = "2b01c19b38oc3499eaaaf89100t454aa";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    let apiForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(refreshWeather);
    axios.get(apiForecast).then(displayForecast);
  }
  
  function searchWeather(event) {
    event.preventDefault();
    let searchCityElement = document.querySelector("#search-input");
  
    getWeatherForecast(searchCityElement.value);
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", searchWeather);
  
  getWeatherForecast("Tzaneen");