export const dynamic = 'force-dynamic'; // Force dynamic (server) route instead of static page

import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getMessaging, getToken } from 'firebase/messaging';
import firebaseApp from '@/lib/firebase';

export async function GET(req: Request, res: Response) {
  const currentToken = await getUserDeviceToken();

  if (!currentToken) {
    return NextResponse.json({
      message: `${currentToken?.toString()}`,
    });
  }

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

  const url = `https://fcm.googleapis.com/v1/projects/${process.env.FCM_PROJECT_ID}/messages:send`;

  const payload = {
    message: {
      token: currentToken,

      notification: {
        title: 'token',
        body: `${currentToken}`,
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

async function getUserDeviceToken() {
  // if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  const messaging = getMessaging(firebaseApp);

  const currentToken = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  });

  return currentToken;
  // }

  // return null;
}
