const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/restaurants/:restaurantID/', express.static('public'));

app.get('/restaurants/:restaurantID/reviews', (req, res) => {
 

});

app.listen(PORT, () => {
  console.log(`node-express listening on...  ${PORT}`);
});
