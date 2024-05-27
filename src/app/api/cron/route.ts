export const dynamic = 'force-dynamic'; // Force dynamic (server) route instead of static page

import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10); // 'YYYY-MM-DD' 형식으로 날짜를 얻음

  const events = await prisma.event.findMany({
    where: {
      AND: [{ type: 'BIRTHDAY' }, { birthday: { birthday: todayStr } }],
    },
    include: {
      user: true,
      eventee: true,
    },
  });

  if (events.length === 0) {
    return NextResponse.json({
      status: 200,
      ok: true,
      message: 'no-events for today',
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

  const messages = events.map((event) => {
    const payload = {
      message: {
        token: event.user.deviceToken,
        notification: {
          title: 'Happy Birthday!',
          body: `Dear ${event.eventee.name}, happy birthday from ${event.user.name}!`,
        },
      },
    };

    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  });

  const responses = await Promise.all(messages);
  const results = await Promise.all(responses.map((res) => res.json()));

  return NextResponse.json({ results }, { status: 200 });

  // return NextResponse.json({
  //   status: response.status,
  //   ok: response.ok,
  //   headers: response.headers,
  //   url: response.url,
  //   accessToken: accessToken,
  // });
}
