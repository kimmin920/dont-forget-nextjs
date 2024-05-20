import { sendPushNotification } from '@/app/notification/actions';
import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import { firebaseConfig } from '@/lib/firebase';

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      ...firebaseConfig,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

const temp_token =
  'e5gEGjlYmoJcGLX8_E_lnh:APA91bFLxNCxn8lpYXQzBUsItrlhyuf_vQBGOayS2PUmES5mgSATsdKJmu5Ewc6UneCzMCJNRF8FciYIOw-a124zZfppKLBK8v6YlsjmQjpEigCkBDEb7HgvXpvLjQq0rPMm6HXBstIO';
export async function GET(req: Request, res: Response) {
  // if (
  //   req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`
  // ) {
  //   return NextResponse.json({ status: 401, message: 'Unauthorized' });
  // }

  try {
    console.log(admin);
    const data = await admin
      .messaging()
      .send({
        token: temp_token,
        notification: {
          title: "Don't forget!",
          body: 'message',
        },
      })
      .catch((error) => console.log(error));

    console.log(data);

    return NextResponse.json({ ok: true, data: 'success!!!' });
  } catch (error) {
    const result = await fetch(
      'http://worldtimeapi.org/api/timezone/America/Chicago',
      {
        cache: 'no-store',
      }
    );
    const data = await result.json();
    return NextResponse.json({
      status: 400,
      error,
      data: data,
      message: { error, temp_token },
    });
  }
}
