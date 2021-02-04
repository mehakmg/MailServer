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
                    // private_key:
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