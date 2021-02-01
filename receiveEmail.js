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
/////////////////////////////////////////////////////////
//RECEIVE MAILS
////////////////////////////////////////////////////////
app.get('/api/receiveEmail', (req, res) => {
    // res.send("hello")
    console.log(req.body.fromEmail);
  
    const Imap = require('imap'),
      inspect = require('util').inspect;
    // const fs = require('fs');
  
    var imap = new Imap({
      user: 'mehakgarg147@gmail.com',
      password: 'Mnzx@147',
      host: 'imap.gmail.com',
      port: 993,
      tls: true
    });
  
    console.log(imap);
    function openInbox(cb) {
      imap.openBox('INBOX', true, cb);
    }
    imap.once('ready', function() {
      openInbox(function(err, box) {
        console.log("box"+ box);  
        // call function to select the mailbox inbox to fetch new emails from inbox 
         var f = imap.seq.fetch('1:3', {
                   bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
                   struct: true
                 });
  
         f.on('message', function(msg, seqno) {
         console.log("msgggggggggggggggggggggg"+msg);
         console.log("seqnoooooooooooooooo"+ seqno);
         })
  
         f.once('error', function(err) {
           console.log('Fetch error: ' + err);
         });
  
         f.once('end', function() {
           console.log('Done fetching all messages!');
           imap.end();
        });
      })
  })
  
  var f = imap.seq.fetch('1:3', {
    bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
    struct: true
  });
  
  // let's create events for incoming emails
  // this event will call when we start reciving any email
  f.on('message', function(msg, seqno) {
  msg.on('body', function(stream, info) {
      var buffer = '';
      stream.on('data', function(chunk) {
        buffer += chunk.toString('utf8');
      });
      stream.once('end', function() {
        console.log(prefix + 'Parsed header: %s', 
        inspect(Imap.parseHeader(buffer)));
      });
    });
  })
  // this will occurs when any error occurs while fetching emails
  f.on('error', function(err){
  console.log(err)
  })
  
  f.on('end', function(){
  
  })


});
  
  
// Server Setup
const port = process.env.PORT || 5000;
let server = http.createServer(app);
server.listen(port);
console.log('Server listening on port', port);