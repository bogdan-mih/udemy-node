const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// env parameter if it exists, else 3000
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup hbs engine and views directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve Express
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bug'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App - About',
        name: 'Bug'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App - Help',
        name: 'Bug',
        message: 'This is the help message'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address',
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address,
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
           error: 'You must provide a search term',
        });
    }

    console.log(req.query);
    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Weather App - 404 Help',
        name: 'Bug',
        message: 'Help article not found'
    });
});

// Match anything that hasn't been matched before
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Weather App - 404',
        name: 'Bug',
        message: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.');
});