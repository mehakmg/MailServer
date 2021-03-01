const autoMailer = require('./controllers/autoMailer');
const uploadDoc = require('./controllers/attachment');
const receive = require('./controllers/receiveMail');
const draft = require('./controllers/draftMail');

module.exports = function (app) {
    // app.get('/', checkAuth, autoMailer.postTestapp);
    app.post('/api/sendEmail', autoMailer.sendEmail);
    app.post("/api/upload", uploadDoc.uploadFile);
    app.get('/api/receiveEmail', receive.receiveEmails);
    app.post('/api/draftEmail', draft.draftEmail);
    // app.get("/files",checkFile, uploadDoc.getListFiles);
    // app.get("/files/:name",checkFile, uploadDoc.download);
}