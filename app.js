//npm packages
const express = require("express"); 
const https = require("https");
const bParser = require("body-parser");
//npm packages

const app=express();

//listen to port
app.listen(3000, (req, res) => 
{
  console.log("Server Listening"); 
});

//use body parser from HTML file
app.use(bParser.urlencoded({ extended: true }));



app.get("/", (req, res) => 
{
  res.sendFile(__dirname + "/index.html");
});

app.post("/" ,(req, res) => 
{
  //Api Link
  let cName = req.body.city;
  let apiKey = "b28f425afa646263272040317206150d";
  let urls = `https://api.openweathermap.org/data/2.5/weather?q=${cName}&appid=${apiKey}&mode=json&units=metric`;

  https.get(urls, (response) => 
  {
    response.on("data", (data) => 
    {
      const wData = JSON.parse(data); //Format in JSON
      let tmp = wData.weather     //Access Object Information
      let icn = `http://openweathermap.org/img/wn/${wData.weather[0].icon}@2x.png`;

      res.write("<h1>Weather Condition</h1>")
      res.write(`<h1><i>${cName},${wData.sys.country}</i></h1>`)
      res.write(`<h1><i>Overall Condition</i>: ${wData.weather[0].main}</h1>`);
      res.write(`<h1><i>Temp Condition</i>: ${wData.main.temp} max: ${wData.main.temp_max} min: ${wData.main.temp_min}</h1>`);
      res.write(`<h1><i>Humidity Condition</i>: ${wData.main.humidity}</h1>`);
      res.write(`<h1><i>Wind Condition</i>: <u>Speed: </u>${wData.wind.speed} <u>Degree: </u>${wData.wind.deg}</h1>`);
      res.write(`<img src=${icn}>`);
      res.send(); // Only One Send
    })
  })
})









