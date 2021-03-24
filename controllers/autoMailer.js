var nodemailer = require('nodemailer');
const {google} = require('googleapis');

const client_id = "254399097342-ujpopebe1m45ibj2biq4u8pb53npqilo.apps.googleusercontent.com";
const client_secret = "4m00xUXoorEOn8G48MTHvzdE";
const redirect_uri = "http://localhost:5000/oauth2callback";
let accesstoken = "";

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uri
);
const scopes = [
  // 'https://www.googleapis.com/auth/blogger',
  // 'https://www.googleapis.com/auth/calendar',
  'https://mail.google.com/'
];
const googleAuth = require('google-auth-library');
// const SCOPES = ['https://www.goo/gleapis.com/auth/cloud-platform'];
// const serviceAccount = require('./sendEmailId.json');
async function getAccessToken() {
   
    const jwtClient = new googleAuth.JWT(
        serviceAccount.client_email,
        null,
        serviceAccount.private_key,
        scopes,
        null
    );
    return jwtClient.authorize().then((tokens) => {
      accesstoken = tokens.access_token
      console.log("kkkkkkkkkkkk",tokens.access_token)});
}




// getAccessToken()
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
   
    const {
      emailService = "gmail",
      secure = true,
      port = 465,
      fromEmail,
      password
    } = req.body;
  
   
  //   let access = nodemailer.set('oauth2_provision_cb', (user, renew, callback)=>{
  //     let accessToken = userTokens[user];
  //     if(!accessToken){
  //         return callback(new Error('Unknown user'));
  //     }else{
  //         return callback(null, accessToken);
  //     }
  // });
  
    var mail = nodemailer.createTransport({
      service: emailService,

      host: 'smtp.gmail.com' || 'smtp.office365.com',
      secure: secure,
      port: port,
      
      auth: {
        // type: "OAuth2",
        // user: fromEmail, //I've also used my email here
        // serviceClient: serviceAccount.client_id,
        // privateKey: serviceAccount.private_key,
        // accessToken: accesstoken,
        // expires: expires,
        type : 'OAuth2',
// /        serviceClient : apijsonData.client_id,
        clientId : client_id,
        // privateKey : apijsonData.private_key,
        clientSecret: client_secret,
        user: fromEmail,
        accessToken : 'ya29.a0AfH6SMCjlsas8XxrRLSqAVhRttkJ6m8cAGT6Ad6WcsEijoYvERc0mgBCuzoVHYUlRiSDm4F9dtiWDpPj8l7NkhMpmLDtKpgSUK_TQYFBdY6iC_HSQG4nPwK6WXjG8PseUcGYwYHHcofyTJytnSsF4GcHhqXA'
        // refreshToken : '1//04ppsezp1YcbNCgYIARAAGAQSNwF-L9IrUANSFfH4lITecyXBEWi17yy40A8IACU1al90A3ScF3RBHEkfYy-m4mIs7rYIfne4Wek'//'1//04is8mzs5_zi0CgYIARAAGAQSNwF-L9IrDf18lQegasklpXXlU53aDxUYpqyw0EhDcZCp5xZZVB2H6fPwGzCOvK9pVgRsPkYXwWg'
      },
      headers: {
       
        'Content-Type': 'application/json',
       
      },
    });
    var mailOptions = {
      from: req.body.fromEmail,
      to: req.body.toEmail,
      cc: req.body.cc,
      bcc: req.body.bcc,
      subject: req.body.subject,
      text: req.body.msg,
 
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