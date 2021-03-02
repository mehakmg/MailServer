var imaps = require('imap-simple');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
exports.draftEmail = async (req, res) => {
    var config = {
        imap: {
            user: 'mehakgarg147@gmail.com',//'dheerajgoyal38@gmail.com',//
            password: 'Mnzx@147',
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
            authTimeout: 3000
        }
    };

console.log(req.body);
     imaps.connect(config).then(function (connection) {
        //  console.log(connection);
        const message = `
      TO: js@gm.cm
      SUBJECT: hiiii
       
      ${req.body.text}
      `;
    //   console.log(message.toString());
       connection.append(message.toString(), {mailbox: '[Gmail]/Drafts', flags: '\\Draft'});
      });

        // res.send(result)
}