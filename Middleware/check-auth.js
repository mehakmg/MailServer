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
        next();
     } catch (error) {
        next();
        // res.status(403).send({message: 'No Access Token, or access token invalid'})
     }

}