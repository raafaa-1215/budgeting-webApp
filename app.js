const express = require("express");
const port = 4000;
const bodyParser = require("body-parser");
const app = express();
const handler = require("scripts/request-handler.js");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());

app.get("/", handler.getIndex);

app.listen(port, function () {
    console.log(`app running at http://localhost:${port}`);
});