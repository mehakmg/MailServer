var Imap = require('imap'),
    inspect = require('util').inspect;
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
    exports.receiveImap = async (req, res) => {
        var MailParser = require("mailparser").MailParser;
        var Promise = require("bluebird");
        Promise.longStackTraces();
        
        var imapConfig = {
            user: 'mehakgarg147@gmail.com',
            password: 'Mnzx@147',
            host: 'imap.gmail.com',
            port: 993,
            tls: true
        };
        
        var imap = new Imap(imapConfig);
        Promise.promisifyAll(imap);
        
        imap.once("ready", execute);
        imap.once("error", function(err) {
            // log.error("Connection error: " + err.stack);
            console.log("reeee"+err.stack);
        });
        
        imap.connect();
        
        function execute() {
            imap.openBox("INBOX", false, function(err, mailBox) {
                if (err) {
                    console.error(err);
                    return;
                }
                imap.search(["1:1"], function(err, results) {
                    if(!results || !results.length){console.log("No unread mails");imap.end();return;}
                    /* mark as seen
                    imap.setFlags(results, ['\\Seen'], function(err) {
                        if (!err) {
                            console.log("marked as read");
                        } else {
                            console.log(JSON.stringify(err, null, 2));
                        }
                    });*/
        
                    var f = imap.fetch(results, { bodies:  ['HEADER.FIELDS (FROM)',''] });
                    f.on("message", processMessage);
                    f.once("error", function(err) {
                        return Promise.reject(err);
                    });
                    f.once("end", function() {
                        console.log("Done fetching all unseen messages.");
                        imap.end();
                    });
                });
            });
        }
        
        
        function processMessage(msg, seqno) {
            console.log("Processing msg #" + seqno);
            // console.log(msg);
        
            var parser = new MailParser();
            parser.on("headers", function(headers) {
                console.log("Header: " + JSON.stringify(headers));
            });
        
            parser.on('data', data => {
                if (data.type === 'text') {
                    console.log(seqno);
                    console.log(data.text);  /* data.html*/
                }
        
                // if (data.type === 'attachment') {
                //     console.log(data.filename);
                //     data.content.pipe(process.stdout);
                //     // data.content.on('end', () => data.release());
                // }
             });
        
            msg.on("body", function(stream) {
                stream.on("data", function(chunk) {
                    parser.write(chunk.toString("utf8"));
                });
            });
            msg.once("end", function() {
                // console.log("Finished msg #" + seqno);
                parser.end();
            });
        }
        // let getEmailFromInbox = (mailServer) => {
        //     mailServer.openBox('INBOX', true, function (err, box) {
        //         if (err) throw err;
        //         // we can define range '1:3'
        //         let f = mailServer.seq.fetch('1:1', {
        //             bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
        //             struct: true
        //         });
        //         f.on('message', function (msg, seqno) {
        //             console.log('Message #%d', seqno);
        //             let prefix = '(#' + seqno + ') ';
        //             msg.on('body', function (stream, info) {
        //                 let buffer = '';
        //                 stream.on('data', function (chunk) {
        //                     buffer += chunk.toString('utf8');
        //                 });
        //                 stream.once('end', function () {
        //                     console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
        //                 });
        //             });
        //         });
        //         f.once('error', function (err) {
        //             console.log('Fetch error: ' + err);
        //         });
        //         f.once('end', function () {
        //             console.log('Done fetching all messages!');
        //             //mailServer.end();
        //         });
        //     });
        // }
        
        // let createLabel = (mailServer, labelName) => {
        //     mailServer.addBox(labelName, (err) => {});
        //     console.log('message', 'New Label or Box Created');
        // }
        
        // let getMailboxStatusByName = (mailServer, inboxName) => {
        //     mailServer.status(inboxName, (err, mailbox) => {
        //         console.log('message', mailbox);
        //     });
        //     console.log('message', 'Label or Box Status');
        // }
        
        // let getMailBoxLabels = (mailServer) => {
        //     mailServer.getBoxes((error, mailbox) => {
        //         console.log('message', mailbox);
        //     })
        // }
        
        // let deleteLabel = (mailServer, labelName) => {
        //     mailServer.delBox(labelName, (error) => {})
        //    console.log('message', 'Label or Box removed');
        // }
        
        // let mailServer1 = new Imap({
        //     user: 'mehakgarg147@gmail.com',
        //     password: 'Mnzx@147',
        //     host: 'imap.gmail.com',
        //     port: 993,
        //     tls: true,
        //     tlsOptions: {
        //         rejectUnauthorized: false
        //     },
        //     authTimeout: 3000
        // }).once('error', function (err) {
        //     console.log('Source Server Error:- ', err);
        // });
        // mailServer1.once('ready', function () {
        //     mailServer1.openBox('INBOX', true, function (err, box) {
        //         if (err) throw err;
        //         console.log('message', 'server1 ready');
        //     });
        
        //     // mail operation
        //     getMailBoxLabels(mailServer1);
        //     getEmailFromInbox(mailServer1)
        //     createLabel(mailServer1, "demo-label1");
        //     deleteLabel(mailServer1, "demo-label1");
        //     getMailboxStatusByName(mailServer1, "INBOX");
        // })
        // mailServer1.connect();
        // var imap = new Imap({
        //     user: 'mehakgarg147@gmail.com',
        //     password: 'Mnzx@147',
        //     host: 'imap.gmail.com',
        //     port: 993,
        //     tls: true
        //   });
          
        //   function openInbox(cb) {
        //     imap.openBox('INBOX', true, cb);
        //   }
          
        //   imap.once('ready', function() {
        //     openInbox(function(err, box) {
        //         if (err) throw err;
        //         var f = imap.seq.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)',''] });
        //         f.on('message', function(msg, seqno) {
        //           //console.log('Message #%d', seqno);
        //           var prefix = '(#' + seqno + ') ';
        //           msg.on('body', function(stream, info) {
        //             if (info.which === '')
        //               //console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
        //             var buffer = '', count = 0;
        //             stream.on('data', function(chunk) {
        //               count += chunk.length;
        //               buffer += chunk.toString('utf8');
        //               if (info.which === 'TEXT')
        //                 //console.log(prefix + 'Body [%s] (%d/%d)', inspect(info.which), count, info.size);
        //                 console.log(buffer);
        //             });
        //             stream.once('end', function() {
        //               if (info.which !== '')
        //                 console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
        //               else
        //                 console.log(prefix + 'Body [%s] Finished', inspect(info.which));
        //             });
        //           });
        //           msg.once('attributes', function(attrs) {
        //             console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
        //           });
        //           msg.once('end', function() {
        //             console.log(prefix + 'Finished');
        //           });
        //         });
        //         f.once('error', function(err) {
        //           console.log('Fetch error: ' + err);
        //         });
        //         f.once('end', function() {
        //           console.log('Done fetching all messages!');
        //           imap.end();
        //         });
        //       });
        //   });
          
        //   imap.once('error', function(err) {
        //     console.log(err);
        //   });
          
        //   imap.once('end', function() {
        //     console.log('Connection ended');
        //   });
          
        //   imap.connect();
    }
