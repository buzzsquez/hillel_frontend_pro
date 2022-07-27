let static = require('node-static');
const fetch = require('node-fetch');
let file = new static.Server('.');
let port = 3141;

console.log(`Server running on port ${port}`);

const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '5459957075:AAHU-g1HjDhSJlEWlGxlPrgCOoJBvfw7mKM';
const bot = new TelegramBot(TOKEN, { polling: true });

class Configurations {
    static balancerServer = 'http://localhost:3736';
}

class APILayer {
    static getWeather() {
        return fetch(Configurations.balancerServer + '/weather/current')
            .then(resp => resp.json())
            .catch(err => {
                console.error(err)
            });
    } static getForecast() {
        return fetch(Configurations.balancerServer + '/weather/forecast/24h')
            .then(resp => resp.json())
            .catch(err => {
                console.error(err)
            });
    }
}

bot.onText(/\/weather/, (msg) => {
    const chatId = msg.chat.id;
    const action = msg.text.split(' ')[1];

    if (action === 'current') {
        APILayer.getWeather()
            .then(weather => {
                bot.sendMessage(chatId, "Current weather for " + weather.name + ": " + JSON.stringify(weather.main, null, '\t'))
            })
            .catch(err => {
                console.error(err)
            });
        return;
    }

    if (action === 'forecast') {
        APILayer.getForecast()
            .then(weather => {
                bot.sendMessage(chatId, "Forecast for 24h for " + weather.city.name + ": ")
                let cityWeather = [];
                for (let i = 0; i <= weather.list.length; i++) {
                    cityWeather.push(weather.list[i].dt_txt)
                    cityWeather.push(weather.list[i].main)
                    if (i > 7) {
                        break;
                    }
                }
                bot.sendMessage(chatId, JSON.stringify(cityWeather, null, '\t'))
            })
            .catch(err => {
                console.error(err)
            });
        return;
    }

    if (content === '') {
        return;
    }
    return;
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.text === '/weather current' || msg.text === '/weather forecast' || msg.text === '/start') {
        return
    } else {
        bot.sendMessage(chatId, 'Wrong command. Try these options 👇', {
            reply_markup: {
                'keyboard': [['/weather current', '/weather forecast']],
            }
        });
        return;
    }
});