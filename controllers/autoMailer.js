let nodemailer = require('nodemailer');
// import { LocalStorage } from "node-localstorage";
 
// global.localStorage = new LocalStorage('./scratch');
const {google} = require('googleapis');

// const getFileData = require('./attachment');
const client_id = "254399097342-ujpopebe1m45ibj2biq4u8pb53npqilo.apps.googleusercontent.com";
const client_secret = "4m00xUXoorEOn8G48MTHvzdE";
const redirect_uri = "http://localhost:5000/oauth2callback";
let accesstoken = "";

// const fileName = localStorage.getItem('fileName');
// const filePath = localStorage.getItem('filePath');

// console.log("sssssssssssssssssssss",getFileData.filename);
exports.postTestapp = (req, res) => {
    res.send("hello from mail server API!");
};
const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uri
);
const scopes = [
  'https://www.googleapis.com/auth/blogger',
  'https://www.googleapis.com/auth/calendar'
];
const googleAuth = require('google-auth-library');
const SCOPES = ['https://www.googleapis.com/auth/cloud-platform'];

async function getAccessToken() {
    const serviceAccount = require('./sendEmailId.json');
    const jwtClient = new googleAuth.JWT(
        serviceAccount.client_email,
        null,
        serviceAccount.private_key,
        SCOPES,
        null
    );
    return jwtClient.authorize().then((tokens) => {
      accesstoken = tokens.access_token
      console.log("kkkkkkkkkkkk",tokens.access_token)});
}




getAccessToken()
const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes
});

oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // store the refresh_token in my database!
    console.log(tokens.refresh_token);
  }
  console.log(tokens.access_token);
});

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

      host: 'smtp.gmail.com' || 'smtp.office365.com',
      secure: secure,
      port: port,
      
      auth: {
        
        type : 'OAuth2',
// /        serviceClient : apijsonData.client_id,
        clientId : client_id,
        // privateKey : apijsonData.private_key,
        clientSecret: client_secret,
        user: fromEmail,
        accessToken : accesstoken
        // refreshToken : '1//04ppsezp1YcbNCgYIARAAGAQSNwF-L9IrUANSFfH4lITecyXBEWi17yy40A8IACU1al90A3ScF3RBHEkfYy-m4mIs7rYIfne4Wek'//'1//04is8mzs5_zi0CgYIARAAGAQSNwF-L9IrDf18lQegasklpXXlU53aDxUYpqyw0EhDcZCp5xZZVB2H6fPwGzCOvK9pVgRsPkYXwWg'
      },
      headers: {
        // 'Authorization': `Bearer : ${req.body.accessToken}`,
        'Content-Type': 'application/json',
       
      },
    });
    // console.log("wwwwwwwwwwwwwwwwwwwwww",getFileData.filename);
    var mailOptions = {
      from: req.body.fromEmail,
      to: req.body.toEmail,
      cc: req.body.cc,
      bcc: req.body.bcc,
      subject: req.body.subject,
      text: req.body.msg,
      //   attachments: [ 
      //     { 
      //         filename: fileName, 
      //         // content : "helllooooooo"
      //         path: filePath, 
      //         // cid: 'uniq-mailtrap.png'
      //     } 
      // ] 
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
  
  