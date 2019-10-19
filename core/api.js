const config = require('../config');
const fs = require('fs');

module.exports.getCountryList = (callback) => {
    const dataFolder = config.config.dataFolder;
    fs.readFile(`${dataFolder}countryList.json`,(err, data) => {
        if(err) callback(err)
        else {
            // console.log('data',JSON.parse(data));
            callback(null,JSON.parse(data));
        }
    });    
}
//return data for a single country:
// input string value for country
// output object of Icountry
module.exports.getCountry = (country,callback) => {
    if(typeof country === 'string') {
        const dataFolder = config.config.dataFolder;
        fs.readFile(`${dataFolder}${country}.json`,(err, data) => {
            if(err) callback(err)
            else {
                console.log('data',JSON.parse(data));
                callback(null,JSON.parse(data));
            }
        });    
    }
}