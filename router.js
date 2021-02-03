const autoMailer = require('./controllers/autoMailer');
const checkAuth = require('./Middleware/check-auth');

module.exports = function (app) {
    // app.get('/', checkAuth, autoMailer.postTestapp);
    app.post('/api/sendEmail', checkAuth, autoMailer.sendEmail);
}