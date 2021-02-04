var admin = require("firebase-admin");
module.exports = (req, res, next) => {

    /**
     * Isert code to intercept all requests coming into API
     * and check access token against Firebase 
     * if accessToken is valid do next() else
     * return 403 error
     * https://firebase.google.com/docs/auth/admin/verify-id-tokens#web
     */
    
   
     try {
        // REACH OUT TO FIREBASE WITH ACCESS TOKEN FROM USER
        // check if access token is valid. if valid next(), else res.status(403).send({message: 'No Access Token, or access token invalid'})
        if (!admin.apps.length){
            admin.initializeApp({
                databaseURL: 'https://bugsy-crm.firebaseio.com',
                // credential: admin.credential.applicationDefault()
                credential: admin.credential.cert({
                    projectId: 'bugsy-crm',
                    clientEmail: "firebase-adminsdk-cuwbq@bugsy-crm.iam.gserviceaccount.com",
                    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDCUFWt574karHe\nwzw2ByPvinTLFCB3q0k43OWydNAHvUEk1ullg+q5m+2Pu8Q3LjDiVzo7+M0qpagG\nXhYsbPoHoH2JjpfwQq5Qrtfnued0Jpi+LEpe6Qx9pexERxkAZwWaiT7BuKxsRTOj\n8ffykbVhyNcv5Fya9AbNl3wngtOr20q/K/baAx7h1iEBHwn0SjCahw624mRT345L\noH/nudjMRNSbfzHNETCgrVINaVWOgoSyimuw58Nq/t6tmrt5M3TsHztUwAIk+C8i\nvKH2IvrbtkDfy6KHqnT+zgEizxkGmHQz50Rv4QP7/42fn69bs4xjwuZ1zKM43RHE\nqAtEXwqfAgMBAAECggEAAVz4dl5+qGlrqAYIGZxeDtU6PAwdv0OJm+w3qy2L4Mu2\nGAeaVUgUsIcMK/Nb/CUIAjn6g2jTjLX8Ua2m336TJpOIX4CSi3uqscJKumPuXprd\nMPImoBcuFbevL37frzmH/ll5O6ubwLNeyu+oM8S/S6M8M2WZY5ZrNGQGlSjFauYa\nAt79DDU8/18nWE+AReyP53OwAASqOY/OyBD6zfJvtP1u30iT/iDf6L30eqkC85I6\nwSrQVDf7cKQFU3OElv1bx0yBte+vCX+KM8Cx/RX/E9u4nNOZtiv33QBHvLgXZ9Tf\nEZEg3dwnDrNTqd7a2uqKujl9C1xvWvw/rg/oMo1SgQKBgQDugoTMOb/gyAAtp9rF\nD4uLzR9aBX+6q9kleVTmI5sm2kxJqWO0vtreuR0JhGasiCsGtqhPPZoYzhDot/y+\nAi10vdP+ie7JsmxymOtr45SeO2H02xg2exd4caMbBEFLFC/tk1uasMCLCW0Mbngp\ndt6LduB41VYq3ZwvGGKrMCfDwQKBgQDQkCK81yg+jamWQm/Wjp/vNhPqr+bIKaBY\naCXZPoQGB4u4PpY7tBEgP4F0prwDLaIqpimx5KInloZFbjHoFhCngFjewBS6J2Bm\nxIMYhMQF0C+dVFTvWycwThDl5G1gkomTFHjl23tvgjg5VPTdYMWoi7zmyicdHne7\nxCFUAz7mXwKBgE39k9sMDzg7bgN/3cOOX70pJ9VR8wBhbTIZyK8weW1s+IElyJqz\nxfIKafpQtxo3tIoPdF3k8NynlVPjxduD7sU7xXR4OgLuOxQF+QVgd5p+JHvioLo/\n6d7SmdkdvRQF195BzzR4E53jSStFfDliy0ajaqdYa0K9EHM98BW2O2qBAoGBAI1R\nzSf2Bj/0j3/QPqW8eKSHGRHB5PemNQ8Saur8UEshm8vZJMUJqz0VqutW+ziQGD0b\n4E645CM8/HhZRZnEMb692fn9X04P1mNsLoRTmdtyiIDrnq2dLz2s+Ag+MtroEC5I\nBe+CO+5/5wb6CP1kUCp3nSUovz4c4fap3AdoN5uzAoGBAM9gfDm3bqShNvT3jqE3\nhG0KgFve0ZIa9H/QA08IVe9A9uF6G6RP0/qtNpxOm0KTC5qmCmDHdJdyW9C4Lnic\nuF/MJVjDruka7EgumXDPAdxa1VHTtPvck42NzI+Yom6ozs36GYg8JDckdc32dZ2W\nm2OdPudO1NfEJV1VPhTyzzYD\n-----END PRIVATE KEY-----\n",
                })
              });
        }
          
        const idToken = req.headers.authorization.split(" ")[1];
      //   console.log("idToken c",idToken);
        admin.auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            console.log("uid : ",uid);
            next()
        })
        .catch((error) => {
            // console.log(error)
            // Handle error
            console.log("errrorr der",error)
            res.status(401).send({message: 'User Not Authenticated with Firebase'});
        });

     } catch (error) {
        console.log("wessddc",error);
        res.status(403).send({message: 'No Access Token, or access token invalid'})
     }

}