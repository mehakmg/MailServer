let express = require('express');
let http = require('http');
let bodyParser = require('body-parser');
let morgan = require('morgan');
const bearerToken = require('express-bearer-token');

let app = express();
let router = require('./router.js');
// const app = express();

app.use(morgan('tiny'));
// app.use(bodyParser.json({typer:'*/*'}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.use(bearerToken({
//   bodyKey: 'access_token',
//   queryKey: 'access_token',
//   headerKey: 'Bearer',
//   reqKey: 'token',
//   cookie: false, 
  
//   // by default is disabled

//   // cookie: {
//   //   signed: true, // if passed true you must pass secret otherwise will throw error
//   //   secret: 'YOUR_APP_SECRET',
//   //   key: 'access_token' // default value
//   // }
// }));

// Setting the headers for all routes to be CORS compliant
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
router(app);

// Server Setup
const port = process.env.PORT || 5000;
let server = http.createServer(app);
server.listen(port);
console.log('Server listening on port', port);
