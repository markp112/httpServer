const express = require('express');
const Router = express.Router();
const fileProcesser = require('../core/processFactFile');
const countryFunctions = require('../core/api.js');


Router.get('/processFile',(req, res) => {
  fileProcesser.processFactFile((err, data) => {
  console.log("TCL: data", data)
    
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
  console.log('/getCountryList')
  countryFunctions.getCountryList((err, data) => {
    if(err) {
      res.status(409).send(err);
    } else {
      console.log('data = ',data);
      res.send(data);
      res.status(200)
    }
    
  });
})

module.exports = Router;