
const express = require('express');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const http = require('http');
const routes = require('./routes/routes');


const path = require('path')

const app = express();
app.use(routes);
app.use(serveStatic(path.join(__dirname, '/data')));

const staticBasePath = './data';


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(serveStatic(path.join(__dirname, '/public')))


const port = 8085;

const server =http.createServer(app);

server.listen(port, () => {
    console.log('App listening on port',port);

});
