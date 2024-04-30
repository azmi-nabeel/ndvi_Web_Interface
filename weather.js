require('dotenv').config();

const url = `https://api.openweathermap.org/data/2.5/weather?q=Dharwad&appid=${process.env.API_KEY}&units=metric`
const getWeather = () => {
  return new Promise((resolve, reject) => {
    fetch(url).then((response) => {
      response.json().then((data) => {
        if(data.error) {
          reject("Unable to fetch")
        }else{
          resolve({ 
            temp: data.main.temp,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            humidity: data.main.humidity
           })
        }
      }) 
    }) 
  })
}

module.exports = { getWeather }

