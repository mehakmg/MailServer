const autoMailer = require('./controllers/autoMailer');
const checkAuth = require('./Middleware/check-auth');
const uploadDoc = require('./controllers/attachment')

module.exports = function (app) {
    // app.get('/', checkAuth, autoMailer.postTestapp);
    app.post('/api/sendEmail', checkAuth, autoMailer.sendEmail);
    app.post("/upload", uploadDoc.upload);
    app.get("/files", uploadDoc.getListFiles);
    app.get("/files/:name", uploadDoc.download);
}