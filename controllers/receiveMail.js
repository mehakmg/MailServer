var imaps = require('imap-simple');
const _ = require('lodash');
const simpleParser = require('mailparser').simpleParser;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
exports.receiveEmails = async (req, res) => {
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

    const result = await imaps.connect(config).then(function (connection) {
        return connection.openBox('INBOX').then(function () {
            var searchCriteria = ['ALL'];
            var fetchOptions = {
                bodies: ['HEADER', 'TEXT', ''],
            };
            return  connection.search(searchCriteria, fetchOptions).then(async function (messages) {
                 const emailssub = [];
                 for(const item of messages){
                    var all = _.find(item.parts, { "which": "" })
                    var id = item.attributes.uid;
                    var idHeader = "Imap-Id: "+id+"\r\n";
                    await simpleParser(idHeader+all.body).then(( mail) => {
                       
                        for(const item of (mail.from.value)){
                            
                            emailssub.push({"subject": mail.subject,
                            "body": mail.text,
                        "from"  : item.address ,
                    "time" : mail.date});
                        }
                    //  console.log(mail.date);
                    //   console.log(Object.keys(mail));
                        // res.end('ok')
                    }).catch((err) =>{
                        console.log("error in simple parser" + err);
                    });
                 }
                return emailssub ;
            }).catch((err) =>{
                console.log("Issue in search" + err);
            });
        });
    });

        res.send(result)
}