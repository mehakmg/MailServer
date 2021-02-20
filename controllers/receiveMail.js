// var Imap = require('imap'),
//     inspect = require('util').inspect;

// exports.receiveEmails = (req, res) => {
//     var imap = new Imap({
//         user: 'mehakgarg147@gmail.com',
//         password: 'Mnzx@147',
//         host: 'imap.gmail.com',
//         port: 993,
//         tls: false
//     });

//     function openInbox(cb) {
//         imap.openBox('INBOX', true, cb);
//     }
//     imap.once('ready', function () {
//         openInbox(function (err, box) {
//             if (err) throw err;
//             imap.search(['UNSEEN', ['SINCE', 'June 15, 2020']], function (err, results) {
//                 if (err) throw err;
//                 var f = imap.fetch(results, { bodies: '' });
//                 f.on('message', function (msg, seqno) {
//                     console.log('Message # % d', seqno);
//                     var prefix = '(#' + seqno + ') ';
//                     msg.on('body', function (stream, info) {
//                         console.log(prefix + 'Body');
//                         stream.pipe(fs.createWriteStream('msg -' + seqno + '-body.txt'));
//                     });
//                     msg.once('attributes', function (attrs) {
//                         console.log(prefix + 'Attributes: % s', inspect(attrs, false, 8));
//                     });
//                     msg.once('end', function () {
//                         console.log(prefix + 'Finished');
//                     });
//                 });
//                 f.once('error', function (err) {
//                     console.log('Fetch error: ' + err);
//                 });
//                 f.once('end', function () {
//                     console.log('Done fetching all messages!');
//                     imap.end();
//                 });
//             });
//         });
//     });
//     imap.once('error', function (err) {
//         console.log(err);
//     });
//     imap.once('end', function () {
//         console.log('Connection ended');
//     });
//     imap.connect();
// }

var imaps = require('imap-simple');
const _ = require('lodash');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
exports.receiveEmails = (req, res) => {
    var config = {
        imap: {
            user: 'mehakgarg147@gmail.com',
            password: 'Mnzx@147',
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
            authTimeout: 3000
        }
    };


    imaps.connect(config).then(function (connection) {
 
        return connection.openBox('INBOX').then(function () {
            var searchCriteria = [
                'UNSEEN'
            ];
     
            var fetchOptions = {
                bodies: ['HEADER', 'TEXT'],
                markSeen: false
            };
     
            return connection.search(searchCriteria, fetchOptions).then(function (results) {
                var subjects = results.map(function (res) {
                    return res.parts.filter(function (part) {
                        return part.which === 'HEADER';
                    })[0].body.subject[0];
                });
     
                console.log(subjects);
                // =>
                //   [ 'Hey Chad, long time no see!',
                //     'Your amazon.com monthly statement',
                //     'Hacker Newsletter Issue #445' ]
            });
        });
    });
}