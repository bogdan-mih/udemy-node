const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiOTExYm9nZGFuIiwiYSI6ImNrM3U5c20xajBhaWgza2xrejZvdnpubGcifQ.qHaQXoYipFhaaRP9shmHIQ&language=ro&limit=1';
    const params = {
        url,
        json: true,
    };
    request(params, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined);
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            };
            callback(undefined, data);
        }
    });
};

module.exports = geocode;