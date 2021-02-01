let express = require('express');
let http = require('http');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let nodemailer = require('nodemailer')
let app = express();
// const app = express();

app.use(morgan('tiny'));
// app.use(bodyParser.json({typer:'*/*'}));

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

app.get('/', (req, res) => {
  res.send("hello")
});

app.post('/api/sendEmail1', (req, res) => {
  console.log(req.body);
  res.send({ msg: req.body })
  // console.log(re);
  // req.a
});

app.post('/api/sendEmail', (req, res) => {
  console.log(req.body.fromEmail);

  const output = `<p> You have new email</p>
    <h3>Contact details
    <p>${req.body}</p></h3>`;
  const {
    emailService = "gmail",
    // host = "smtp.mail.yahoo.com",
    secure = true,
    port = 465,
    fromEmail,
    password
  } = req.body;

  var mail = nodemailer.createTransport({
    service: emailService,
    // host: host,
    secure: secure,
    port: port,
    auth: {
      user: fromEmail,
      pass: password
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });
  console.log(mail);

  var mailOptions = {
    from: req.body.fromEmail,
    to: req.body.toEmail,
    cc: req.body.cc,
    bcc: req.body.bcc,
    subject: req.body.subject,
    text: req.body.msg
    //   attachments: [ 
    //     { 
    //         filename: req.body.attachments.name, 
    //         // content : "helllooooooo"
    //         // path: __dirname + `/${req.body.attachments}`, 
    //         // cid: 'uniq-mailtrap.png'
    //     } 
    // ] }
  }


  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(__dirname);
      console.log(error);
      res.send(error)
    } else {
      res.send("Email Sent successfully")
      console.log('Email sent: ' + info.response);
    }
  });
});


// Server Setup
const port = process.env.PORT || 5000;
let server = http.createServer(app);
server.listen(port);
console.log('Server listening on port', port);
