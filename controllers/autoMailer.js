let nodemailer = require('nodemailer');
let config = require('../config');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
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
  
  //   const getTokenWithRefresh = (secret, refreshToken) => {

  //     let oauth2Client = new google.auth.OAuth2(
  //       console.log(secret)
  //           //  secret.clientID,
  //           //  secret.clientSecret,
  //           //  secret.redirectUrls
  //     )
  
  //     oauth2Client.credentials.refresh_token = refreshToken
  
  //     oauth2Client.refreshAccessToken( (error, tokens) => {
  //         if (!error){
  //           console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrsaaaaaaaaaaaaaaa",tokens.access_token);
  //         }
  //         //save tokens.access_token to DB
      
  //  xxxxxxxxxxxxxx   })
  
  // }
  
  // getTokenWithRefresh();
    var mail = nodemailer.createTransport({
      service: emailService,
      // host: 'smtp.gmail.com',
      secure: secure,
      port: port,
      auth: {
        // type : 'OAuth2',
        // clientId : "878926295747-6qvfco814vtdk7e00j53ugtvlr4ehcvt.apps.googleusercontent.com",
        // password : password,
        // clientSecret: 'aFsV-fl5HUT2GnPGDhzbMBkz',
        user: fromEmail,
        password : password//<mehak@abcgenesis.com>",
        // accessToken  : 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJjMmVkODQ5YThkZTI3ZTI0NjFlNGJjM2VmMDZhYzdhYjc4OGQyMmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYnVnc3ktY3JtIiwiYXVkIjoiYnVnc3ktY3JtIiwiYXV0aF90aW1lIjoxNjEyNDk1Nzk3LCJ1c2VyX2lkIjoic1BodU0zRjFRZFVwVWhCWjlzeVV5QVowQjFlMiIsInN1YiI6InNQaHVNM0YxUWRVcFVoQlo5c3lVeUFaMEIxZTIiLCJpYXQiOjE2MTI0OTU3OTcsImV4cCI6MTYxMjQ5OTM5NywiZW1haWwiOiJtZWhha2dhcmcxNDdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm1laGFrZ2FyZzE0N0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.LF5n8JcsbBwENkb1p0C7vjsLB3Vkf6F8Dyygi8wAqi6HbE5Xaf4x19HwBiVdniK106TlAWOZ2mb9wtz1pj7oNZ7xBk4K1YbLaiku5I7P9OGyvNOKDRO44VL2ATcYZFFKH-Kv5cuCjGqvmUCvenyi92si3gGxMidq_cn48Ybdbg1_F7KiM9XGlZ_broa-ViTEGoZukpPOqLcr5G1EXvj1_1QThWInEhR-a3tKqsbLfakMxdTa80UJSMraQYFx5E_8sQf1iASOEO7990F_3qfeggxCRP8hVvmQHR16wMiWJkkN7cEfk0Uc3W1s_bE7JSpjzQjEumiyyzdiqteQOFFbogya29.A0AfH6SMCHkmHHnkrJcu_tR5d25rp1Z9gRlFZjaGnlSA2cwsxoO3TvnXTeAkbmoGNhrY7NevDYooqRRXp_50ROX5SzfDyIvVmUR6Yeb51pClRAxphVyoxmxjBY-HWORQRYyS5AtHA20K7IeF4gnQVyWh9U1yrE',
        // refreshToken : '1//04wBGVct8ITcmCgYIARAAGAQSNwF-L9Ir7KMdM9Qfb05qpC0WKxy7YVlB16mI7nuKIRqZcmaA_AJLfbKTNcqomC4zwTAfehRlf6c'
      },
      headers: {
        // 'User-Agent': 'my request',
        'Authorization': `Bearer : ${req.body.accessToken}`,
        'Content-Type': 'application/json',
        // 'Accept': 'application/json'
      },
      // tls: {
      //   ciphers: 'SSLv3'
      // }
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
  
  