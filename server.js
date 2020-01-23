const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
// serving static assets
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.get('/:address/:page/:pageSize', (req, res) => {
  request(
    { url: `http://47.89.27.192/api/v1/address/${req.query.params.address}?page=${req.query.params.page}&pageSize=${req.query.params.pageSize}` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});
app.use(express.static(__dirname + '/build'));
// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
app.listen(port, () => console.log("Server started on port " + port));