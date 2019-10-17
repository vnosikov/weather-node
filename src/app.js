const express = require('express');
const path = require('path');
const hbs = require('hbs');
var cors = require('cors');

const geocode = require('./geocode');
const forecast = require('./forecast');


const app = express();
const PORT = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Vasily'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Vasily'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Vasily',
    message: 'I see a red door and I want to paint it black',
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Not found',
    name: 'Vasily',
    error: 'Help article not found',
  });
});

app.get('/weather', cors(), (req, res) => {
  const address = req.query.address;
  if(!address) {
    res.status(400).send({
      error: 'You must provide a search term'
    });
    return;
  }

  geocode(address, (error, data) => {
    if (error) {
      res.send({ error });
      return;
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if(error) {
        res.send({ error });
      } else {
        res.send({
          location: data.location,
          forecastData
        });
      }
    });
  });
});

app.get('/products', (req, res) => {
  if(!req.query.search) {
    res.send({
      error: 'You must provide a search term'
    });
  } else {
    res.send({
      products: []
    });
  }
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Not found',
    name: 'Vasily',
    error: 'My 404',
  });
})


app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
