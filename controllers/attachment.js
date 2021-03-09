const multer = require('multer');
const fileValidation = require('../Middleware/upload');
const path = require('path');
const fs = require('fs')
let nodemailer = require('nodemailer');

const client_id = "254399097342-ujpopebe1m45ibj2biq4u8pb53npqilo.apps.googleusercontent.com";
const client_secret = "4m00xUXoorEOn8G48MTHvzdE";
const redirect_uri = "https://developers.google.com/oauthplayground";


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
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any

   
  const {
    emailService = "gmail",
    secure = true,
    port = 465,
    fromEmail
  } = req.body;


  var mail = nodemailer.createTransport({
    service: emailService,

    host: 'smtp.gmail.com' || 'smtp.office365.com',
    secure: secure,
    port: port,
    
    auth: {
      
      type : 'OAuth2',
      clientId : client_id,
      clientSecret: client_secret,
      user: fromEmail,
      refreshToken : ''
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
            from: req.body.fromEmail,
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
      // Display uploaded image for user validation
     
    //   res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
  });
}
// const upload = async (req, res) => {
//   let fileData = req.files;
//   res.send(req)
//   let attachments = []
//   async.waterfall([
//     cb => {
//       if (!fileData){
//         cb('File is required')
//       }else{
//         async.each(fileData, function(file,clbk){
//           let fileName = file.filename
//           let filePath = "./uploads/" + fileName;
//           if (file.fieldname === 'doc'){
//             let fileNameSplit = fileName.split(".")[0]
//             let mimeType = file.mimetype;
//             //check validd mimetype
//             let status = isFileValid(fileName, mimeType, 'doc');
//             if (!status) return clbk("only PDF and csv can be uploaded");
//             //new file 
//             let newFileName = fileNameSplit + new Date().toString().slice(0,19).replace(/[-:]/g,"") + '.' + getExtension(fileName)
//             //upload file to s3
//             fs.readFile(filePath , (error, fileData)=> {
//                if (error){
//                  clbk(error)
//                }else{
//                  uploadFile.uploadToS3(fileData, newFileName , 'doc' ,  (err, image) => {
//                    if(error){
//                      console.log('Error while uploading file to s3' , err);
//                      clbk(error)
//                    }else{
//                      attachments.push(image.Location)
//                      //deleting file 
//                      fs.unlink(filePath, err => {
//                        if(err){
//                          console.log('error while unlinking file' , err);
//                          clbk(err)
//                        }
//                        clbk(null)
//                      })
//                    }
//                  })
//                }
//             })
//           }
//         }, function(err){
//           if(err) return cb(err)
//           return cb(null, attachments)
//         })
//       }
//     }
//   ])

  // function isFileValid(filename, mimetype, type){
  //   let allowedExts = type === 'video' ? ["mp4", "webm" , "ogg"] : (type === 'image' ? ['png', 'jpeg' , 'jpg'] : ['pdf', 'csv'])
  //   let allowedMimeTypes = type === 'video' ? ["video/mp4" , "video/webm" , "video/ogg"] : (type === 'image' ? ['image/png', 'image/jpeg' , 'image/jpg'] : ['image/pdf'])

  //   let extension = getExtension(filename);
  //   return allowedExts.indexOf(extension.toLowerCase()) != -1 && allowedMimeTypes.indexOf(mimetype) != -1;
  // }

  // try {
  //   await uploadFile(req, res);

  //   console.log("reqqqqqqqqqqqqqqqqqqqqq",req.file);
  //   if (req.file == undefined) {
  //     return res.status(400).send({ message: "Please upload a file!" });
  //   }

  //   res.status(200).send({
  //     message: "Uploaded the file successfully: " + req.file,
  //   });
  // } catch (err) {
  //   res.status(500).send({
  //     message: `Could not upload the file: ${req.file}. ${err}`,
  //   });
  // }
// };

// const getListFiles = (req, res) => {
//   const directoryPath = __basedir + "/resources/static/assets/uploads/";

//   fs.readdir(directoryPath, function (err, files) {
//     if (err) {
//       res.status(500).send({
//         message: "Unable to scan files!",
//       });
//     }

//     let fileInfos = [];

//     files.forEach((file) => {
//       fileInfos.push({
//         name: file,
//         url: baseUrl + file,
//       });
//     });

//     res.status(200).send(fileInfos);
//   });
// };

// const download = (req, res) => {
//   const fileName = req.params.name;
//   console.log("dsadz",__basedir);
//   const directoryPath = __basedir + "/resources/static/assets/uploads/";

//   res.download(directoryPath + fileName, fileName, (err) => {
//     if (err) {
//       res.status(500).send({
//         message: "Could not download the file. " + err,
//       });
//     }
//   });
// };

// module.exports = {
//   upload,
//   getListFiles,
//   download,
// };