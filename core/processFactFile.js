const ICountry = require('./classes/countryClass');
const IGeography = require('./classes/geographyClass');
const ICoordinate = require('./classes/coordinatesClass');
const IMapReferences = require('./classes/mapReferenceClass');
const IArea = require('./classes/areaClass');
const countryCodes = require('../data/countryCodes');
const config = require('../config');


// format the country remove underscores and capitalise first letters
// input a name of a country
// output country name formatted
const formatCountry = (country) => {
    let countryFormatted  = country.replace(/_/g, ' ');
    countryFormatted = countryFormatted.toLowerCase()
                            .split(' ')
                            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                            .join(' ');
    return countryFormatted;
}

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

const getCountryCode = (countryName)  => {
   let countryCode = countryCodes.filter(country => country.country === countryName);
   return countryCode[0] ? countryCode[0].code : "";
}

// get the introductory text about the country
const getIntroduction = (intro) =>  intro.background;

// return the longitude and latitude 
const getCoordinates = (coordinates) => {
  const coord = new ICoordinate();
  const latitude = coordinates.latitude;
  const longitude = coordinates.longitude;
  coord.lat = Number(`${latitude.degrees}.${latitude.minutes}`);
  coord.lng = Number(`${longitude.degrees}.${longitude.minutes}`);
  if(latitude.hemisphere === 'S') coord.lat *= -1;  
  if(longitude.hemisphere === 'W') coord.lng *= -1;  
  return coord;
}

const getGeography = (geography) => {
  const geoData = new IGeography(geography.location);
  if('geographic_coordinates' in geography) geoData.coordinates = getCoordinates(geography.geographic_coordinates);
  return geoData;
}

// retrieve the mapRefrences and return to caller
const getMapReferences = (mapReferences) => {
  return new IMapReferences(mapReferences);
}

// return the area 
const getArea = (area) => {
  console.log("area =",area)
  let areaClass = new IArea(area.global_rank);
  for(type in area){
   if(type === "land" || type === "water" || type === "total") { areaClass.addArea(type, area[type].value, area[type].units)};
  }
  return areaClass;
}

// iterate the data selecting the elements we want
// expects the CIA factbook as JS object
// return an array of country data
const processData = (jsData, callback) => {
  //const arrayData = Object.keys(jsData).map(i => jsData[i]);
  const worldData = []
  for (let [key, value] of Object.entries(jsData.countries)){
      let name = formatCountry(key);
      let country = new ICountry(key);
      console.log("code=",getCountryCode(name), name);
      country.countryCode = getCountryCode(name);
      country.introduction = getIntroduction(value.data.introduction);
      const geography = value.data.geography
      country.geography = getGeography(geography);
      country.mapReference = getMapReferences(geography.map_references);
      country.area = getArea(geography.area);
      worldData.push(country);
  }
  callback(null, worldData);
}

const writeCountryArray = (countryArray, callback) => {
  const dataFolder = config.config.dataFolder;
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
// build a list of countries
// inputs an array of ICountry
// output an array of strings with the country name
const buildCountryList = (countryArray) => {
  let countryList = [];
  countryArray.forEach(country =>{
    countryList.push (country.name);
  })
 return countryList;
}

const writeCountryList = (countryList, callback) => {
    const dataFolder = config.config.dataFolder;
    let fs = require('fs');
    fs.writeFile(`${dataFolder}countryList.json`,JSON.stringify(countryList),(err) => {
      if(err){
        callback(err);
      } else {
        callback(null,'completed');
      }
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
              let countryList = buildCountryList(countryArray);
              writeCountryList(countryList,(err,msg) =>{
                if(err){
                  console.log(err);
                  callback(err);
                  return;
                }//no need to call back at this point
              });
            });
            callback(countryArray);
        })
      }
    });
}