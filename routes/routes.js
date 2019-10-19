const express = require('express');
const Router = express.Router();
const fileProcesser = require('../core/processFactFile');
const countryFunctions = require('../core/api.js');


Router.get('/processFile',(req, res) => {
  fileProcesser.processFactFile((err, data) => {
   if(err){
      res.status(402);
      res.send(err);
    }else {
      res.status(200).send(data);
    }
  });
})
// return  list of countries to the app
Router.get('/getCountryList',(req, res) => {
  
  countryFunctions.getCountryList((err, data) => {
    if(err) {
      res.status(409).send(err);
    } else {
      
      res.send(data);
      res.status(200)
    }
    
  });
})

// return  data on a single country
// request to contain the country name
// returns an Icountry object
Router.get('/getCountry',(req, res) => {
  let country = req.query.country;
  countryFunctions.getCountry(country,(err, data) => {
    if(err) {
      res.status(409).send(err);
    } else {
      res.send(data);
      res.status(200)
    }
    
  });
})

module.exports = Router;