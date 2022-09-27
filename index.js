const express = require('express');
const route = require("./api/router")
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.use("/", route)
app.listen(port);

console.log('RESTful API server started on: ' + port);
