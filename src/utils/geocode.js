const request = require('request') 

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=pk.eyJ1IjoibWljaG83NyIsImEiOiJja2k5YjJlNDMwNGRyMnpwNjNlNXBlcjFkIn0.8ktzj291MSO5FuW28--iiw&limit=1`;
    request({url: url, json: true}, (error, response) => {
      if(error){
        callback('Unable to connect to the location service', undefined)
      }else if(response.body.features.length === 0){
        callback('location not found', undefined)
      }
      else {
        callback(undefined, {
          longitude : response.body.features[0].center[0],
          latitude : response.body.features[0].center[1],
          location : response.body.features[0].place_name
        })
      }
    } )
  }

  module.exports = geocode