// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express

// configuration =================
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/views/index.html');
});

app.use('/js', express.static(__dirname + '/js'));
app.use('/views', express.static(__dirname + '/views'));

app.use('/bower-components', express.static(__dirname + '/bower-components'));
app.use('/css', express.static(__dirname + '/css'));


// listen (start app with node server.js) ======================================
app.listen(8084);
console.log("App listening on port 8084");