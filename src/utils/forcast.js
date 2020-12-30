const request = require('request')

const forcast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=21ecc042350950242f3ddd5003684f07&query=${lat},${long}`
    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback('unable to connect to the weatherstack service', undefined)
        }
        else if(response.body.error){
            callback('unable to find location', undefined)
        }
        else {
            callback(undefined, {temp: response.body.current.temperature, feelLike: response.body.current.feelslike})
        }
    })
}

module.exports = forcast