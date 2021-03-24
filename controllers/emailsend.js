import * as googleAuth from 'google-auth-library';
import { Credentials } from 'google-auth-library/build/src/auth/credentials';

const scope = "https://mail.google.com/";

/**
 * Step 0: Create OAuth2 credentials at the Google Console (make sure to download JSON, not only just get key and secret)
 */

export const credentials = {
	"web": {
		"client_id": "############-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
		"project_id": "my-project",
		"auth_uri": "https://accounts.google.com/o/oauth2/auth",
		"token_uri": "https://accounts.google.com/o/oauth2/token",
		"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
		"client_secret": "xxxxxx-xxxxxxxx-xxxxxxx",
		"redirect_uris": ["http://localhost"],
		"javascript_origins": ["http://localhost"]
	}
};

// export function getAuthorizeUrl(callback: (err, url) => any): void {
// 	const oauth2Client = new googleAuth.OAuth2Client(credentials.web.client_id, credentials.web.client_secret, credentials.web.redirect_uris[0]);

// 	const authUrl = oauth2Client.generateAuthUrl({
// 		access_type: 'offline',
// 		scope: scope
// 	});

// 	callback(null, authUrl);
// }

// getAuthorizeUrl((err, url) => {
// 	if(err) return console.log(err);
// 	console.log("Auth url is: ", url);
// });