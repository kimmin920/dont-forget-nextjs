'use server';
import schedule from 'node-schedule';
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

function sendPushNotification(token: string, message: string) {
  admin
    .messaging()
    .send({
      token,
      notification: {
        title: "Don't forget!",
        body: message,
      },
    })
    .then((response) => {
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
}

export async function scheduleNotification(formData: FormData) {
  const dateTimeLocal = formData.get('datetime-local') as string;
  const message = formData.get('message') as string;
  const deviceToken = formData.get('device-token') as string;

  const scheduleDate = new Date(dateTimeLocal);
  console.log(deviceToken);
  schedule.scheduleJob(scheduleDate, function () {
    sendPushNotification(deviceToken, message);
  });
}
