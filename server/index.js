const bodyParser = require('body-parser');
const express    = require('express');
const app        = express();
// const request = require('request');
// const http       = require('http');
const httpProxy  = require('http-proxy');
const proxy   = httpProxy.createProxyServer();
const morgan = require('morgan');
const PORT = 3000;

const bannerServer = 'http://localhost:3005';
const menuServer = 'http://localhost:3001';
// const nearbyServer = 'http://localhost:3004';
var reviewsServer = 'http://localhost:3002';

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/restaurants/:rest_id', express.static('public'));

// app.all("/restaurants/:rest_id/banners/*", function(req, res) {
//   console.log('redirecting to Server1');
//   proxy.web(req, res, {target: bannerServer});
// });

// app.get("/grub-reactor/:id", function(req, res) {
//   console.log('redirecting to Server2');
//   apiProxy.web(req, res, {target: menuServer});
// });

// app.all("/nearby/*", function(req, res) {
//   console.log('redirecting to Server3');
//   apiProxy.web(req, res, {target: nearbyServer});
// });

app.all("/restaurants/:rest_id/allreviews/*", function(req, res) {
  console.log('redirecting to Server3');
  proxy.web(req, res, {target: reviewsServer});
});

app.listen(PORT, () => {
  console.log(`node-express listening on...  ${PORT}`);
});
