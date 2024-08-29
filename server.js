const express = require("express");
const axios = require("axios");

const app = express();

const API_KEY = "f2ef936329e39beac70c625dd396f012"

//Define a route for the root  path of the applicatrion

//Start the server and listen on the port
app.get("/", (req,res) => {
    const address = req.query.address; //Here nread the address query parameter from the request
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`
    console.log(url);

    //MAke an HTTP GET request to API using axios
    axios.get(url) 
       .then(response => {
        const data = response.data;
        const cityName = data.name; 
        const tempreture =data.main.temp;
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        const message = `City Name: ${cityName}<br>Tempreture: ${tempreture}deg;C<br>Sunset Time: ${sunsetTime}`;

        res.send(message);
       })
       .catch(error => {
        console.error(error);
        res.status(500).send("Error occured while fetching the weather data");
       });
});

app.listen(3000, () => {
    console.log("Server Listen on Port: 3000");
});