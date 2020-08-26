const express = require("express");
const https = require("https");
const body_Parser = require("body-parser"); 
const app = express();

app.use(body_Parser.urlencoded({extended:true}));

app.get("/",function(req, res){
  
    res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req, res){
    
    const query = req.body.cityName; 
    const apikey ="9e906990d25aab93efe36a52cda256d7";
    const units= "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid="+ apikey +"&q="+ query +"&units="+ units +"";
    https.get(url, function(response){

        console.log(response.statusCode);
        response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp = weatherData.main.temp;
        const area= weatherData.name
        const icon = weatherData.weather[0].icon;
        const imageURL= "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        
        res.write("<h1>the temperature in "+ area +" is "+ temp +" degree celsius</h1>");
        res.write("<img src=" + imageURL + ">");
        res.send();

        })
    })




})


app.listen(3000, function(){
    console.log("3000 running");


});


