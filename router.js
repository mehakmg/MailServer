const autoMailer = require('./controllers/autoMailer');
const checkAuth = require('./Middleware/check-auth');
const uploadDoc = require('./controllers/attachment')
const checkFile = require('./Middleware/upload');
const receive = require('./controllers/receiveMail')

module.exports = function (app) {
    // app.get('/', checkAuth, autoMailer.postTestapp);
    app.post('/api/sendEmail', autoMailer.sendEmail);
    app.post("/api/upload", uploadDoc.uploadFile);
    app.get('/api/receiveEmail', receive.receiveEmails)
    // app.get("/files",checkFile, uploadDoc.getListFiles);
    // app.get("/files/:name",checkFile, uploadDoc.download);
}