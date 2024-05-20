import { google } from 'googleapis';

export async function getAccessToken() {
  const credentials = {
    type: process.env.FCM_TYPE,
    project_id: process.env.FCM_PROJECT_ID,
    private_key_id: process.env.FCM_PRIVATE_KEY_ID,
    private_key: process.env.FCM_PRIVATE_KEY,
    client_email: process.env.FCM_CLIENT_EMAIL,
    client_id: process.env.FCM_CLIENT_ID,
    auth_uri: process.env.FCM_AUTH_URI,
    token_uri: process.env.FCM_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FCM_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FCM_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FCM_UNIVERSE_DOMAIN,
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
  });

  const token = await auth.getAccessToken();
  return token;
}
