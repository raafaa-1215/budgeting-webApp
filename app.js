const express = require("express");
const port = 4000;
const bodyParser = require("body-parser");
const server = express();
const fs = require('fs');


server.get('/data', (req, res) => {
    const jsonData = fs.readFileSync('mockup-data.json', 'utf8');
    res.json(jsonData);
});

server.use(bodyParser.urlencoded());
server.use(express.static("www"));

server.get("/", function (req, res) {
    res.sendFile(__dirname + '/www/index.html');
});

server.listen(port, function () {
    console.log(`Server running at http://localhost:${port}`);
});