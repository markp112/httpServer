const express = require('express');
const Router = express.Router();
const fileProcesser = require('../core/processFactFile');


Router.get('/processFile',(req, res) => {
  fileProcesser.processFactFile((err,data) =>{
    if(err){
      res.status(402);
      res.send(err);
    }else {
      res.status(200).send(data);
    }
  });
})

module.exports = Router;