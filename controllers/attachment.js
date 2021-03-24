const multer = require('multer');
const fileValidation = require('../Middleware/upload');
const path = require('path');
const fs = require('fs')
let nodemailer = require('nodemailer');

// const client_id = "878926295747-6qvfco814vtdk7e00j53ugtvlr4ehcvt.apps.googleusercontent.com";
// const client_secret = "aFsV-fl5HUT2GnPGDhzbMBkz";
const redirect_uri = "https://developers.google.com/oauthplayground";
const client_id  = "254399097342-ujpopebe1m45ibj2biq4u8pb53npqilo.apps.googleusercontent.com";
const client_secret = "4m00xUXoorEOn8G48MTHvzdE";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './filee/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

exports.uploadFile = (req,res) => {
  let upload = multer({ storage: storage, fileFilter: fileValidation.imageFilter }).single('upload');


  upload(req, res, function(err) {
    
  const {
    emailService = "gmail",
    secure = true,
    port = 465,
    fromEmail
  } = req.body;


  var mail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: secure,
    port: port,
    service : emailService,
    
    auth: {
   
      type : 'OAuth2',
      clientId : client_id,
      clientSecret: client_secret,
      user: fromEmail,
      access_type:'offline',
      accessToken : 'ya29.a0AfH6SMAEHpqOoC0_hSxx62hfCA91KRxPVJnf7QVL17V0KuGWK2XLvvUzdHJca040oFrAUTgKMZ3rqZZJeGCMF_HBBkq0A2DM-LVdGYr3qwOlG4qya8a-okI0XBZbWbMbI81lSbypvrtgRbdnWX3rYfgcmf-N'
      // refreshToken : '1//0gVVGb9GIcmXDCgYIARAAGBASNwF-L9IrlZsUYhgAlTcqNt_nWRIJiCh2hbCWKbE5QBFT5ry9UrkcPw3HaJmCvmU94D7a9AsuHrU'
    },
    headers: {
      'Content-Type': 'application/json',
     
    },
  });
      if (req.fileValidationError) {
          return res.send(req.fileValidationError);
      }
      else if (!req.file) {
          return res.send('Please select a file to upload');
      }
      else if (err instanceof multer.MulterError) {
          return res.send(err);
      }
      else if (err) {
          return res.send(err);
      }

      else{
        // res.send(req.file);
        var mailOptions = {
            // from: req.body.fromEmail,
            to: req.body.toEmail,
            cc: req.body.cc,
            bcc: req.body.bcc,
            subject: req.body.subject,
            text: req.body.msg,
              attachments: [ 
                { 
                    filename: req.file.filename, 
                    path: req.file.path
                    // cid: 'uniq-mailtrap.png'
                } 
            ] 
          }
        
        
          mail.sendMail(mailOptions, function (error, info) {
            if (error) {
             
              console.log(error);
              res.send(error)
            } else {
              console.log(__dirname);
              res.send("Email Sent successfully")
              console.log('Email sent: ' + info.response);
              try {
                fs.unlinkSync(req.file.path)
                //file removed
              } catch(err) {
                console.error(err)
              }
            }
          });
      
      }
    
  });
}
