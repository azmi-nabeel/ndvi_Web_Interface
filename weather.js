require('dotenv').config();
const fs = require('fs');

const url = `https://api.openweathermap.org/data/2.5/weather?q=Dharwad&appid=${process.env.API_KEY}&units=metric`
const getWeather = () => {
  return new Promise((resolve, reject) => {
    fetch(url).then((response) => {
      response.json().then((data) => {
        if(data.error) {
          reject("Unable to fetch")
        }else{
          const date = new Date();
          const file = fs.writeFileSync('./cache/weather.json', JSON.stringify({
            temp: data.main.temp,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            humidity: data.main.humidity,
            wind_speed: data.wind.speed,
            time: date.getHours().toString() + ":" + date.getMinutes().toString(),
          }));
          resolve({ 
            temp: data.main.temp,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            humidity: data.main.humidity,
            wind_speed: data.wind.speed
           })
        }
      }) 
    }) 
  })
}

module.exports = { getWeather }

