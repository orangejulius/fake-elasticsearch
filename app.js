var express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.post('/_bulk', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var items = [];

  for (var i = 0; i < 500; i++) {
    items.push({ index: { created: true, status: 201} });
  }

  res.send(JSON.stringify({ took: 1, errors: false, items: items}));
});

app.listen(9200, function () {
    console.log('Example app listening on port 9200!')
})

