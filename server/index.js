const bodyParser = require('body-parser');
const express    = require('express');
const cors = require('cors');
const app        = express();

const httpProxy  = require('http-proxy');
const proxy   = httpProxy.createProxyServer();
const PORT = 3000;
app.use(cors());

const bannerServer = 'http://ec2-54-193-75-21.us-west-1.compute.amazonaws.com';
const menuServer = 'http://ec2-52-43-228-173.us-west-2.compute.amazonaws.com';
const nearbyServer = 'http://ec2-13-57-220-156.us-west-1.compute.amazonaws.com';
var reviewsServer = 'http://ec2-34-221-253-114.us-west-2.compute.amazonaws.com';

app.use('/grubhub/:rest_id', express.static('public'));

app.get("/restaurants/banners/:rest_id", function(req, res) {
  console.log('redirecting to Server2');
  proxy.web(req, res, {target: bannerServer});
});

app.get("/grub-reactor/:rest_Id/menu/*", function(req, res) {
  console.log('redirecting to Server2');
  proxy.web(req, res, {target: menuServer});
});

app.all("/restaurant/:id", function(req, res) {
  console.log('redirecting to Server3');
  proxy.web(req, res, {target: nearbyServer});
});

app.all("/grubhub/:rest_id/allreviews/*", function(req, res) {
  console.log('redirecting to Server3');
  proxy.web(req, res, {target: reviewsServer});
});

app.listen(PORT, () => {
  console.log(`node-express listening on...  ${PORT}`);
});
