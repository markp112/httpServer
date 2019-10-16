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
  const arrayData = Object.keys(jsData).map(i => jsData[i]);
  console.log(arrayData, arrayData.length);
  

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