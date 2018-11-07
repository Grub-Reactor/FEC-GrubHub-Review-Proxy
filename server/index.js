const bodyParser = require('body-parser');
const express    = require('express');
const app        = express();

const httpProxy  = require('http-proxy');
const proxy   = httpProxy.createProxyServer();
const PORT = 3000;

const bannerServer = 'http://localhost:3005';
const menuServer = 'http://localhost:3001';
const nearbyServer = 'http://localhost:3004';
var reviewsServer = 'http://localhost:3002';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/:rest_id', express.static('public'));

app.all("/:rest_id/banners/*", function(req, res) {
  console.log('redirecting to Server1');
  proxy.web(req, res, {target: bannerServer});
});

app.get("/grub-reactor/:rest_Id/menu/*", function(req, res) {
  console.log('redirecting to Server2');
  proxy.web(req, res, {target: menuServer});
});

app.all("/restaurant/:id/*", function(req, res) {
  console.log('redirecting to Server3');
  apiProxy.web(req, res, {target: nearbyServer});
});

app.all("/:rest_id/allreviews/*", function(req, res) {
  console.log('redirecting to Server3');
  proxy.web(req, res, {target: reviewsServer});
});

app.listen(PORT, () => {
  console.log(`node-express listening on...  ${PORT}`);
});
