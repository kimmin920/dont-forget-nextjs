import { sendPushNotification } from '@/app/notification/actions';
import { NextResponse } from 'next/server';

const temp_token =
  'e5gEGjlYmoJcGLX8_E_lnh:APA91bFLxNCxn8lpYXQzBUsItrlhyuf_vQBGOayS2PUmES5mgSATsdKJmu5Ewc6UneCzMCJNRF8FciYIOw-a124zZfppKLBK8v6YlsjmQjpEigCkBDEb7HgvXpvLjQq0rPMm6HXBstIO';
export async function GET(req: Request, res: Response) {
  // if (
  //   req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`
  // ) {
  //   return NextResponse.json({ status: 401, message: 'Unauthorized' });
  // }

  await sendPushNotification(temp_token, 'message from functin');
  return NextResponse.json({ ok: true });
}
