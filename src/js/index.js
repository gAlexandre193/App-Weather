import '../css/index.css';

// HTML Elements
const getCardWeather = document.querySelector('#cardWeather');
const getInputCity = document.querySelector('#inputCity');
const getBtnSearchLocation = document.querySelector('#btnSearchLocation');
const getImgWeatherIllustration = document.querySelector('#imgWeatherIllustration');
const getCurrentTemp = document.querySelector('#currentTemp');
const getWeatherDescription = document.querySelector('#weatherDescription');
const getHumidity = document.querySelector('#humidity');
const getSpdWind = document.querySelector('#spdWind');

getBtnSearchLocation.addEventListener('click', () => {
  const cityTarget = getInputCity.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  
  if(cityTarget.length > 0) {
    // API
    const API_KEY = '65b4263d35dc0144d8aacb2bc4a3a332';
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityTarget}&appid=${API_KEY}&units=metric`;
  
    fetch(API)
      .then(async (data) => {
        const dataWeather = await data.json();
        const weatherInfo = {
          feels_like: Math.round(dataWeather.main.feels_like),
          temp: dataWeather.main.temp,
          temp_max: dataWeather.main.temp_max,
          temp_min: dataWeather.main.temp_min,
          humidity: dataWeather.main.humidity,
          weather_main: dataWeather.weather[0].main,
          weather_description: dataWeather.weather[0].description,
          weatherIcon: `https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`,
          wind_spd: dataWeather.wind.speed,
        };
  
        if(weatherInfo) {
          getCardWeather.classList.add('showWeatherInfo');
  
          getImgWeatherIllustration.setAttribute('src', weatherInfo.weatherIcon);
          getCurrentTemp.innerHTML = weatherInfo.feels_like;
          getWeatherDescription.innerHTML = weatherInfo.weather_description;
          getHumidity.innerHTML = weatherInfo.humidity;
          getSpdWind.innerHTML = weatherInfo.wind_spd;
        }
      })
      .catch((err) => alert('❌ Algo errado ocorreu'));
  }

  if(cityTarget.length === 0) {
    alert('Você deve inserir o nome da cidade 🔍')
  }
})