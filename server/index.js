const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;

const app = express();
const bannerServer = 'http://localhost:3005';
const menuServer = 'http://localhost:3001';
const nearbyServer = 'http://localhost:3004';
const reviewsServer = 'http://localhost:3002';

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/restaurants/:restaurantID/', express.static('public'));

app.get("/restaurants/:restaurantID/", function(req, res) {
  console.log('redirecting to Server1');
  apiProxy.web(req, res, {target: bannerServer, changeOrigin: true });
});

// app.all("/app2/*", function(req, res) {
//   console.log('redirecting to Server2');
//   apiProxy.web(req, res, {target: ServerTwo});
// });

// app.all("/app2/*", function(req, res) {
//   console.log('redirecting to Server3');
//   apiProxy.web(req, res, {target: ServerThree});
// });

// app.all("/app2/*", function(req, res) {
//   console.log('redirecting to Server3');
//   apiProxy.web(req, res, {target: ServerThree});
// });

app.listen(PORT, () => {
  console.log(`node-express listening on...  ${PORT}`);
});
