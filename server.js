const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('express-favicon')
const history = require('connect-history-api-fallback')

const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, 'dist');

var app = express();

app.use(history());

// // parse application/json
// app.use(bodyParser.json())
// // parse an HTML body into a string
// app.use(bodyParser.text({ type: 'text/html' }));
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// // parse various different custom JSON types as JSON
// app.use(bodyParser.json({ type: 'application/*+json' }));
// // parse some custom thing into a Buffer
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

app.use(express.static(__dirname));
app.use(express.static(publicPath));
app.use(favicon(publicPath + '/favicon.ico'));

app.get('/', function (req, res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server on: http://localhost:%s', port);
});
