const port = 3000;
const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const bodyparser = require('body-parser');

const options ={
    key : fs.readFileSync('./server/keys/private.pem'),
    cert : fs.readFileSync('./server/keys/server.crt')
};

const server = https.createServer(options, app);

const root = `${__dirname}/../`;
const path = {
    client : `${root}/client`
};
app.set('views', path.client + '/views');
app.engine('html', require('ejs').renderFile);
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());
app.use(express.static(path.client + '/views'));
app.use(express.static(path.client + '/views/meetingRoom'));

require('./controllers/route.js')(app);
require('./controllers/socket.js')(server);

server.listen(port, () =>{
    console.log(`WEB-RTC SERVER RUNNING AT ${port}`);
});