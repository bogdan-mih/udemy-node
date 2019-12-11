const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/579ed643728bf2470837232e755bcb5e/' + latitude + ',' + longitude + '?units=si&lang=ro';
    const params = {
        url,
        json: true,
    };
    request(params, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, 'It is currently ' + body.currently.temperature + ' degrees out and there is a '
                + (body.currently.precipProbability * 100).toFixed(0) + '% chance of rain.');
        }
    });
};

module.exports = forecast;