const jwt = require('json-web-token')

module.exports = (req, res, next) => {

    /**
     * Isert code to intercept all requests coming into API
     * and check access token against Firebase 
     * if accessToken is valid do next() else
     * return 403 error
     */

     try {
        // REACH OUT TO FIREBASE WITH ACCESS TOKEN FROM USER
        // check if access token is valid. if valid next(), else res.status(403).send({message: 'No Access Token, or access token invalid'})
        let accessToken = req.cookies.jwt

        //if there is no token stored in cookies, the request is unauthorized
        if (!accessToken){
            return res.status(403).send()
        }
    
        let payload
        try{
            //use the jwt.verify method to verify the access token
            //throws an error if the token has expired or has a invalid signature
            payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            next()
        }
        catch(e){
            //if an error occured return request unauthorized error
            return res.status(401).send()
        }
      //   next();
     } catch (error) {
        next();
        // res.status(403).send({message: 'No Access Token, or access token invalid'})
     }

}