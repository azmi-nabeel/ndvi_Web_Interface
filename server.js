const express = require('express');
const path = require('path');
const { getImageRaw, getImageMapped } = require('./storage.js');
const { getWeather } = require('./weather.js')
const { promptImageResponse, promptResponse } = require('./model.js');
const { readFile } = require('fs/promises');

const Port = process.env.PORT || 8080;

const app = express()

app.use(express.static('public'));
const droneUI = path.join(__dirname, "/public/droneUI.html");

app.get('/', (req, res) => {
  res.sendFile(droneUI);
});

app.get('/images', async (req, res) => {
  const rawImage = await getImageRaw();
  const mappedImage = await getImageMapped();
  res.send({ 
    mappedURL : mappedImage,
    rawURL: rawImage
   })
})

app.get('/weather', async (req, res) => {
  try{
    const data = await readFile('./cache/weather.json', { encoding: 'utf-8' });
    const json = JSON.parse(data);
    const [hours, minutes] = json.time.split(":");
    const time = new Date();

    if(time.getHours().toString() > hours || time.getMinutes() > parseInt(minutes) >= 10){

      const data_api = await getWeather();
      res.send(data_api);

    }else{

      res.send({
        temp: json.temp,
        temp_min: json.temp_min,
        temp_max: json.temp_max,
        humidity: json.humidity,
        wind_speed: json.wind_speed
      });

    }
  }
  catch(err){
    process.exit(61);
  }

})

app.get('/prompt', async (req, res) => {
  const image = req.query.image;

  const promptText = req.query.prompt;

  if(image === ""){
    const response_text = await promptResponse(promptText);
    res.send({
      prompt: promptText,
      response: response_text.join("")
    })

  }else{
    const response = await promptImageResponse(image, promptText);
    res.send({
      image: image, 
      prompt: promptText,
      response: response.join("")
    }); 

  }

})

app.get('*', (req, res) => {
  res.send("404 Not Found!")
})

app.listen(Port, () => {
  console.log(`The app is running at http://localhost:${Port}`);
})