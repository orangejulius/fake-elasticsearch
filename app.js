var express = require('express')
var app = express()
var bodyParser = require('body-parser');

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.use(bodyParser.raw({ type: '*/*', limit: '10MB'}));

app.get('/*', function (req, res) {
    res.send('Hello World!')
})

app.post('/_bulk', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const body = req.body.toString();

  // count the number of newlines in the request body
  // each bulk item is two lines, so the number of items
  // is half the number of newlines
  let count = 0;
  for (let i=0; i < body.length; ++i) {
    if (body[i] == '\n') count++;
  }

  var items = [];

  //send back a 201 created response for each item
  for (var i = 0; i < count / 2; i++) {
    items.push({ index: { created: true, status: 201} });
  }

  res.send(JSON.stringify({ took: 1, errors: false, items: items}));
});

app.listen(9200, function () {
    console.log('Example app listening on port 9200!')
})

