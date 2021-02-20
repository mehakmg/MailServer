let express = require('express');
let http = require('http');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let app = express();

let router = require('./router.js');


app.use(morgan('tiny'));
// app.use(bodyParser.json({typer:'*/*'}));
// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// Setting the headers for all routes to be CORS compliant
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.get('/getData' , (req, res) => {
  res.json({ username : 'mehak'})
})
// app.post('/upload/pic', (req, res) => {
//   // 'profile_pic' is the name of our file input field in the HTML form
  
// });
router(app);

// Server Setup
const port = process.env.PORT || 5000;
let server = http.createServer(app);
server.listen(port);
console.log('Server listening on port', port);
