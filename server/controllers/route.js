const fs = require('fs');

module.exports = (app) =>{
    app.get('/', (req, res) => {
        res.render('index.ejs', {
            title : 'web-rtc',
            url : ''
        });
    }).get('/makeRoom', (req, res) => {
        res.render('makeRoom/makeRoom.html', {
            title : 'makeRoom'
        });
    }).post('/',(req, res) => {
        res.render('index.ejs', {
            url : req.body.inputUrl
        });
    }).get('/meetingRoom/', (req, res) => {
        res.render('meetingRoom/meetingRoom.ejs');
    });
}