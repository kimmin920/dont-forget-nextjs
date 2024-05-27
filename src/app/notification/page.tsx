'use client';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { Input } from '@/components/ui/input';
import { scheduleNotification } from './actions';
import useFcmToken from '@/utils/hooks/useFCMToken';

function NotificationPage() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  return (
    <div>
      <div className='max-w-[350px] overflow-scroll'>{fcmToken}</div>
      {notificationPermissionStatus !== 'granted' && '알림이 꺼져있습니다.'}
      <form action={scheduleNotification} method='POST'>
        <Input type='datetime-local' name='datetime-local' />
        <Input type='text' name='message' />
        <input
          hidden
          type='text'
          name='device-token'
          value={fcmToken}
          readOnly
        />
        <Button type='submit'>SUBMIT</Button>
      </form>
      {/* <Button onClick={sendNotification}>Hit the noti</Button> */}
    </div>
  );
}

export default NotificationPage;
