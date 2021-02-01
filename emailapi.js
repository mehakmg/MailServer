let express = require('express');
let http = require('http');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let app = express();
const app = express();


 
app.use(morgan('tiny'));
// app.use(bodyParser.json({typer:'*/*'}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


// Setting the headers for all routes to be CORS compliant
app.use(function(req,res,next) {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
next();
});

app.get('/', (req, res) =>{
    res.send("hello")
});

app.post('/api/sendEmail1', (req,res) => {
    console.log(req.params);
    res.send({msg : req.body})
    // req.a
});

app.post('/api/sendEmail', (req,res) => {
    console.log(req);
    res.send("hello")
    res.send("fd")
    console.log(req.params.name);
    const output = `<p> You have new email</p>
    <h3>Contact details
    <p>${req.body}</p></h3>`

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info =  transporter.sendMail({
        from: '"mehak" <mehakgarg147@gmail.com>', // sender address
        to: "mehakgarg.henceforth@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
     
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});


// Server Setup
const port = process.env.PORT || 5000;
let server = http.createServer(app);
server.listen(port);
console.log('Server listening on port',port);