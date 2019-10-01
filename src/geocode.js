const request = require('request');


const geocode = (address, callback) => {
  const token = 'access_token=pk.eyJ1Ijoidm5vc2lrb3YiLCJhIjoiY2swd3hocnhiMDBwczNncDg3bG9kMDRiNiJ9.qZdlWXCUZQeGxYmGBiLZSw';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?${token}&limit=1`

  request({
    url,
    json: true
  }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!', null);
    } else if (response.body.features.length === 0) {
      callback('Unable to find location', null);
    } else {
      const location = response.body.features[0];
      const dataObj = {
        location: location.place_name,
        latitude: location.center[1],
        longitude: location.center[0],
      };
      callback(null, dataObj);
    }
  })
}

module.exports = geocode;