let http = require('http');
const fetch = require('node-fetch');
let static = require('node-static');
let file = new static.Server('.');
let port = 3736;

class Configurations {
    static openWeatherAPI = 'https://api.openweathermap.org/data/2.5';
    static openWeatherKEY = '54ff0974d3dbfc2e05f7fbf0d55a6903';
}

class APILayer {
    static loadCurrentWeather() {
        return fetch(Configurations.openWeatherAPI + `/weather?lat=46.488257&lon=30.723309&appid=${Configurations.openWeatherKEY}`)
            .then(resp => resp.json())
            .catch(err => {
                console.error(err)
            });
    }
    static load24hWeather() {
        return fetch(Configurations.openWeatherAPI + `/forecast?lat=46.488257&lon=30.723309&appid=${Configurations.openWeatherKEY}`)
            .then(resp => resp.json())
            .catch(err => {
                console.error(err)
            });
    }
}

function onCurrentWeatherRequest() {
    return APILayer.loadCurrentWeather();
}

function on24hWeatherRequest() {
    return APILayer.load24hWeather();
}

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.url === '/weather/current') {
        onCurrentWeatherRequest(req, res)
            .then(currentWeather => {
                res.write(JSON.stringify(currentWeather));
                res.end();
            })
            .catch(err => {
                res.statusCode = 400
                res.write(JSON.stringify(err));
                res.end();
            });
        return;
    }
    if (req.url === '/weather/forecast/24h') {
        on24hWeatherRequest(req, res)
            .then(weather24h => {
                res.write(JSON.stringify(weather24h));
                res.end();
            })
            .catch(err => {
                res.statusCode = 400
                res.write(JSON.stringify(err));
                res.end();
            });
        return;
    }
    res.write('balancerServer is working!');
    res.end();
}).listen(port);

console.log(`balancerServer running on port ${port}`);