var imaps = require('imap-simple');
const _ = require('lodash');
const simpleParser = require('mailparser').simpleParser;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
exports.receiveEmails = async (req, res) => {
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

    const result = await imaps.connect(config).then(function (connection) {
        
        connection.getBoxes().then(response => {
            var r = response;
            console.log(r);
        });
        return connection.openBox('INBOX').then(function () {
            var searchCriteria = ['1:100'];
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