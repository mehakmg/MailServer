var imaps = require('imap-simple');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
exports.draftEmail = async (req, res) => {
    var config = {
        imap: {
            user: 'dheerajgoyal38@gmail.com',//'mehakgarg147@gmail.com',
            password: '',
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
            authTimeout: 3000
        }
    };

     imaps.connect(config).then(function (connection) {
        const message = `Content-Type: application/x-www-form-urlencoded
      To: ${req.body.to}
      Subject: ${req.body.subject}
       
      ${req.body.text}
      `;
       connection.append(message.toString(), {mailbox: '[Gmail]/Drafts', flags: '\\Draft'});
      });

        // res.send(result)
}