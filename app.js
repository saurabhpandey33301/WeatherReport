const express = require("express");

const {write} = require("fs");

const https = require("https");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/" , function(req,res){
      
    const query = req.body.city ;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=3d1c9aa8aabc027ab64cde9ac780b556&units=metric"
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDiscription = weatherData.weather[0].description 
            const icon = weatherData.weather[0].icon 
            const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png" ;
            res.write("<p>the weather currently is " + weatherDiscription + "</p>");
            res.write("<h1>the temperature in " + query + " is " + temp + "</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send()

        });
    });
});




app.listen(3000, function(){
    console.log("server is running at port 3000 ");
});

