const express = require('express');
const app = express();

const logger = function (req, res, next) {
  console.log('LOGGED:', req.url)

  res.setHeader('cache-control','max-age=31536000')
  next()
}

app.use(logger)

app.get('/sw.js', function (request, response) {
  response.sendFile(__dirname + '/sw.js');
});

app.get('/api/user', function (_, response) {
  response.json({
    username: 'jufei',
    age: 20,
    now: Date.now()
  })
})

app.get('*', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

const listener = app.listen(64755, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
