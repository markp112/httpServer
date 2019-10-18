const config = require('../config');

module.exports.getCountryList = (callback) => {
    const fs = require('fs');
    const dataFolder = config.config.dataFolder;
    
    fs.readFile(`${dataFolder}countryList.json`,(err, data) => {
        if(err) callback(err)
        else {
            // console.log('data',JSON.parse(data));
            callback(null,JSON.parse(data));
        }
    });    
}