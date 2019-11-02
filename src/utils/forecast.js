const request = require('request');

const forecast = (latitude, longitide, callback) => {
    const url = "https://api.darksky.net/forecast/599ee86c1f0ea0c788c13416c87405f2/" + latitude + "," + longitide + "?units=si";
    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } if (body.error) {
            callback('Unable to find the location')
        } else {
            callback(undefined, "Temperature is : " + body.currently.temperature + "celsius. Weather is : " + body.daily.data[0].summary);
        }
    })
}

module.exports = forecast;
