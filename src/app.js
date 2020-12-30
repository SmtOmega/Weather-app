const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()

// file paths
const pathDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')
console.log(viewPath)

// set the path 
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pathDir))


app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Michael Taiwo'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Michael'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Section', 
        message: 'What would you like to know',
        name: "Shola"

    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, data)=>{
        if(error){
            return res.send({
                errorMs: error
            })
        }
        const {latitude, longitude, location} = data
        forcast(latitude, longitude, (error, data)=>{
            if(error){
                return res.send({
                    errorMs: error

                })
            
            }
            res.send({
                forcast: data,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/help/*', (req, res)=> {
    res.render('error', {
        title: 'help Section',
        message: 'The article has been deleted',
        name: 'Mikel'
    })
} )

app.get('*' , (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Page not found',
        name: 'Shola'
    })
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})