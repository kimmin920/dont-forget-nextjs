'use client';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { scheduleNotification } from './actions';
import useFcmToken from '@/utils/hooks/useFCMToken';
import { createClient } from '@utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/api/user';


async function fetchCurrentUserData(): Promise<User> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Failed to fetch user data');
  }

  return user;
}

function NotificationPage() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    async function call() {
      try {
        const user = await fetchCurrentUserData()
        const userId = user.id;
  
        if (fcmToken && userId) {
          fetch('/api/user/updateDeviceToken', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, deviceToken: fcmToken }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Device token updated successfully:', data);
            })
            .catch((error) => {
              console.error('Error updating device token:', error);
            });
        }
      } catch(error) {
        console.error(error)
      }

    }

    call();
  }, [fcmToken]);

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
