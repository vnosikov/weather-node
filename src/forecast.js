const request = require('request');


const forecast = (latitude, longitude, callback) => {
  const token = '49fb9ef40356205af5f331a43c6b6ffd';
  const url = `https://api.darksky.net/forecast/${token}/${latitude},${longitude}?units=si`;

  request({
    url,
    json: true,
  }, (error, data) => {
    if (error) {
      callback('Unable to connect to weather services!', null);
    } else if (data.body.error) {
      callback('Unable to find location', null);
    } else {
      callback(null, data.body.currently);
    }
  });
};

module.exports = forecast;