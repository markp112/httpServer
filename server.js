
const express = require('express');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const http = require('http');
const routes = require('./routes/routes');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 8085;

app.use(cors());
app.use(routes);
app.use(serveStatic(path.join(__dirname, '/data')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const server = http.createServer(app);

// app.get("/getCountryList", (req, res) => {
//     console.log("/getCountryList");
//     countryFunctions.getCountryList((err, data) => {
//         if (err) {
//             res.status(404).send(err);
//         } else {
//             console.log(data);
//             res.status(200).send(data);
//         }
//     });
// });




server.listen(port, () => {
    console.log('App listening on port',port);
});
