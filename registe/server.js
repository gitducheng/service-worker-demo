const express = require('express');
const app = express();

app.get('/sw.js', function (request, response) {
  response.sendFile(__dirname + '/sw.js');
});
app.get('/sw-1.js', function (request, response) {
  response.sendFile(__dirname + '/sw.js');
});

app.get('*', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
