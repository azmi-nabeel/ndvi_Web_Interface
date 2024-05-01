const express = require('express');
const path = require('path');
const { getImageRaw, getImageMapped } = require('./storage.js');
const { getWeather } = require('./weather.js')
const { promptResponse } = require('./model.js')

const Port = process.env.PORT || 8080;

const app = express()
const publicPath = path.join(__dirname, "/public");
const droneUI = path.join(__dirname, "/public/droneUI.html");
const homePage = path.join(__dirname, "/public/about.html");
const assets = path.join(__dirname, "/Assets")

app.use(express.static('public'));

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
  const data = await getWeather();
  res.send(data);
})

app.get('/prompt', async (req, res) => {
  const image = req.query.image;
  const promptText = req.query.prompt;
  const response = await promptResponse(image, promptText);
  res.send({
    image: image, 
    prompt: promptText,
    response: response.join("")
  }); 
})

app.get('*', (req, res) => {
  res.send("404 Not Found!")
})

app.listen(Port, () => {
  console.log(`The app is running at http://localhost:${Port}`);
})