const autoMailer = require('./controllers/autoMailer');
const uploadDoc = require('./controllers/attachment');
const receive = require('./controllers/receiveMail');
const draft = require('./controllers/draftMail');
const signInGoogle = require('./googleApi')
module.exports = function (app) {
    // app.get('/', checkAuth, autoMailer.postTestapp);
    app.post('/api/sendEmail', autoMailer.sendEmail);
    app.post("/api/upload", uploadDoc.uploadFile);
    app.get('/api/receiveEmail', receive.receiveEmails);
    app.post('/api/draftEmail', draft.draftEmail);
    app.post('/api/googleSignin',signInGoogle.googleSignIn);
    // app.get("/files/:name",checkFile, uploadDoc.download);
}