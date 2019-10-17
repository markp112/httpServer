const ICountry = require('./classes/countryClass');
const IGeography = require('./classes/geographyClass');
const ICoordinate = require('./classes/coordinatesClass');


// open the fact file and return a handle to it
const getFactFile = (callback) => {
  const fs = require('fs');
  const folder = './data/';
  const file = 'factbook.json';

  fs.readFile(`${folder}${file}`, (err, data) =>{
    if(err){
      callback(err);
    }
    else {
      let jsData = JSON.parse(data);
      callback(null, jsData);
    }
  })
}

const getIntroduction = (intro) =>  intro.background;

const getCoordinates = (coordinates) => {
  const coord = new ICoordinate();
  const  lattitude =  coordinates.latitude;
  const longitude = coordinates.longitude;
  coord.lat = `${lattitude.degrees}.${lattitude.minutes}${lattitude.hemisphere}`;
  coord.lng = `${longitude.degrees}.${longitude.minutes}${longitude.hemisphere}`;
  return coord;
}

const getGeography = (geography) => {
// console.log('geography :', geography);
  const geoData = new IGeography(geography.location);
  if('geographic_coordinates' in geography) geoData.coordinates = getCoordinates(geography.geographic_coordinates);
  return geoData;
}

// iterate the data selecting the elements we want
// expects the CIA factbook as JS object
// return an array of country data
const processData = (jsData, callback) => {
  //const arrayData = Object.keys(jsData).map(i => jsData[i]);
  const worldData = []
  for (let [key, value] of Object.entries(jsData.countries)){
      let country = new ICountry(key);
      country.Introduction = getIntroduction(value.data.introduction);
      country.geography = getGeography(value.data.geography);
      worldData.push(country);
  }
  callback(null, worldData);
}

const writeCountryArray = (countryArray, callback) => {
  const dataFolder = "./data/world/";
  const fs = require('fs');
  countryArray.forEach(country => {
    fs.writeFile(`${dataFolder}${country.name}.json`,JSON.stringify(country),(err) => {
      if(err) {
        console.log(err);
        callback(err);
      }else callback(null,"files Written");

    });

  })
}

// process the CIA Factfile and break it into smaller files by Wolrd, continent and countries
// return true on successful completion
exports.processFactFile = (callback) => {
    getFactFile((err,data) => {
      if(err) {
        callback(err)
      } else {
          processData(data,(err,countryArray) => {
            writeCountryArray(countryArray,()=>{
              //do nothing
            });
            callback(countryArray);
        })
      }
    });
}