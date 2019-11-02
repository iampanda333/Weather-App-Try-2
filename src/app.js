const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forcast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handlebars engine and views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set up start up directory path to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Raj'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Raj'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'I am here to help you',
        name: 'Raj'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide address query'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({ error });
            }

            forcast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send( { error });
                }

                res.send({
                    forcast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })


    }

})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorText: 'Help article not found',
        name: 'Raj'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorText: 'Page not found',
        name: 'Raj'
    })
})

app.listen(3000, () => {
    console.log('Express is running on port 3000');
})
