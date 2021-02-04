let nodemailer = require('nodemailer');
let config = require('../config');

exports.postTestapp = (req, res) => {
    res.send("hello from mail server API!");
};
  

exports.sendEmail = (req, res) => {
    // console.log(req.body.fromEmail);
    // dertermine tenant : COVET, NEXTPHASE,
    // tenant: tenant ID 
    // to: (who email is being sent to)
    // CC: 
    // BCC:
    // subject:
    // text:
    // const tenantId = req.body.tenantId;
    // config[tenantId].password;
    // config[tenantId].email;
  
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
      headers: {
        // 'User-Agent': 'my request',
        'Authorization': `Bearer : ${req.body.accessToken}`,
        'Content-Type': 'application/json',
        // 'Accept': 'application/json'
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });
    
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
       
        console.log(error);
        res.send(error)
      } else {
        console.log(__dirname);
        res.send("Email Sent successfully")
        console.log('Email sent: ' + info.response);
      }
    });
};
  
  