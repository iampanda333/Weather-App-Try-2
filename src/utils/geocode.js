const request = require('request');

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGlieWFqeW90aXAiLCJhIjoiY2sxd2U5aW1rMDB2azNlbzM1YmxsNXZreiJ9.Tostjf_HnYjwE4-k0FQoJA&limit=1";
    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to geo service!');
        } else if (body.features.length === 0) {
            callback('Unable to find the location');
        } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const data = {
                latitude, 
                longitude,
                location: body.features[0].place_name
            };
            callback(undefined, data);
        }
    })
};

module.exports = geoCode;