const express = require("express");
const port = 4000;
const bodyParser = require("body-parser");
const server = express();

server.use(bodyParser.urlencoded());
server.use(express.static("www"));

server.get("/", function (req, res) {
    res.sendFile(__dirname + '/www/index.html');
});

server.listen(port, function () {
    console.log(`Server running at http://localhost:${port}`);
});