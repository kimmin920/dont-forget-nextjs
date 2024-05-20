export const dynamic = 'force-dynamic'; // Force dynamic (server) route instead of static page

import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const temp_token =
  'e5gEGjlYmoJcGLX8_E_lnh:APA91bFLxNCxn8lpYXQzBUsItrlhyuf_vQBGOayS2PUmES5mgSATsdKJmu5Ewc6UneCzMCJNRF8FciYIOw-a124zZfppKLBK8v6YlsjmQjpEigCkBDEb7HgvXpvLjQq0rPMm6HXBstIO';

export async function GET(req: Request, res: Response) {
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

  const accessToken = await auth.getAccessToken();
  // if (
  //   req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`
  // ) {
  //   return NextResponse.json({ status: 401, message: 'Unauthorized' });
  // }

  const url = `https://fcm.googleapis.com/v1/projects/${process.env.FCM_PROJECT_ID}/messages:send`;

  const payload = {
    message: {
      token: temp_token,
      notification: {
        title: 'Hello',
        body: 'message hell0!',
      },
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return NextResponse.json({
    status: response.status,
    ok: response.ok,
    headers: response.headers,
    url: response.url,
    accessToken: accessToken,
  });
}
