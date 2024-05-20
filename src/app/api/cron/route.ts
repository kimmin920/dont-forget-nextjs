import { sendPushNotification } from '@/app/notification/actions';
import { NextResponse } from 'next/server';
import { getAccessToken } from './get-access-token';

const temp_token =
  'e5gEGjlYmoJcGLX8_E_lnh:APA91bFLxNCxn8lpYXQzBUsItrlhyuf_vQBGOayS2PUmES5mgSATsdKJmu5Ewc6UneCzMCJNRF8FciYIOw-a124zZfppKLBK8v6YlsjmQjpEigCkBDEb7HgvXpvLjQq0rPMm6HXBstIO';
export async function GET(req: Request, res: Response) {
  // if (
  //   req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`
  // ) {
  //   return NextResponse.json({ status: 401, message: 'Unauthorized' });
  // }

  const accessToken = await getAccessToken();
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
  });
}
