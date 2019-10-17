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
      callback(null,jsData);
    }
  })
  
  return
}

  
const processData = (jsData, callback) => {
  //const arrayData = Object.keys(jsData).map(i => jsData[i]);
  const worldData = []
  let country = {
    key:"",
    data:{}
    };
  for (let [key, value] of Object.entries(jsData)){
    console.log(`key = ${key}: value = ${value}`);

    
    for (let [key1, value1] of Object.entries(value)){
      country.key = key1;
      country.data = value1;
      console.log('country=',country);
      worldData.push(country);
    }
  

  }
  //console.log(arrayData, arrayData.length);
  callback(null, worldData);

}




// process the CIA Factfile and break it into smaller files by Wolrd, continent and countries
// return true on successful completion
exports.processFactFile = (callback) => {
    getFactFile((err,data) =>{
      if(err) {
        callback(err)
      } else {
        
        processData(data,(err,jsdata)=>{
        
          callback(data);
        })
        
      }
    });
    return
}