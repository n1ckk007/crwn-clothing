const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// path lets us build out pathing for our directories
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();
// bring stripe library into this file
// we need access to secret key
// this gives us back a function and the func expects an arg as the first param where that arg is the stripe secret key
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// this will instantiate a new express application
const app = express();
// we want the port that we host our app on to be either the process.env.port otherwise put it on port 5000
const port = process.env.PORT || 5000;
// any of the requests coming in, process their body tag and convert to json
app.use(bodyParser.json());
// urlencoded is a way for us to make sure that the url strings we're getting in and passing out don't contain things like spaces/sybmols
app.use(bodyParser.urlencoded({ extended: true }));
// allows us to make requests to our backend server, port 3000 to 5000
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  // serve all the static files in our build
  // use express.static middleware function, allows us to serve a certain file inside of this url/pathing that we path to it
  // the path that we passed was using our path library and we're joining this directory keyname which tells us what dir we're currently in
  // then we're pointing to client/build...build was what gets built when we run our build script inside package.json
  app.use(express.static(path.join(__dirname, 'client/build')));
 // only way to serve it we have to say what route we want to use it at
  // any url that the user hits we pass this get a function that gets a request and response
  app.get('*', function(req, res) {
     // response being the response that we're gonna send back
    // index.html contains all of our front end client code
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

// use the app obj that we have from express and declare the type of route that we want it to be
// receive a request from our client side code to some route that is called /payment
app.post('/payment', (req, res) => {
   // req obj will provide us with the token that we need in order to make the charge (this token is something we get back from our stripe button which holds all details/info/data related to the req being made from the front end)
  const body = {
    source: req.body.token.id,
    // amount value gonna be total charge cost that we're trying to make
    amount: req.body.amount,
    currency: 'usd'
  };

  // use this to make charges, pass 2 args, the body that we just made + pass it a callback in the same format cos its going to represent the req and res obj that we get back
// 2nd arg is a func where the stripe service hands us back an error if there is one or a response if its successful
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      // 500 is a failure status code
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});