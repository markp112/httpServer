const express = require('express');
const Router = express.Router();
const fileProcesser = require('../core/processFactFile');


Router.get('/processFile',(req, res) => {
  console.log('hello');
  
  fileProcesser.processFactFile((err,data) =>{
    if(err){
      console.log(err);
      res.status(402);
      res.send(err);
    }else {
      res.status(200);
      res.send(data);
    }
    return;
  });
  
  
})

module.exports = Router;