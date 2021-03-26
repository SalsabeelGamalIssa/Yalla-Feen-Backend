const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim()

exports.search = (place)=>{
  const data = null;
  const err = null;
  geocoder.search( { q: place } )
  .then((response) => {
        // data =  response
        console.log(response[0].lat);
    })
    .catch((error) => {
        err = error;
    })
  // return {data,err}
  }