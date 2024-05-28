importScripts(
  'https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyDxBtJxeqluy2Wgou3N-kS-6KCZSJW8GY0',
  authDomain: 'dont-forget-ace34.firebaseapp.com',
  projectId: 'dont-forget-ace34',
  storageBucket: 'dont-forget-ace34.appspot.com',
  messagingSenderId: '1042202960910',
  appId: '1:1042202960910:web:062d053a8f6acddae5485f',
  measurementId: 'G-622G56FMPB',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

self.addEventListener('push', function (e) {
  if (!e.data.json()) return;

  const jsonData = e.data.json();
  const notification = jsonData.notification;
  const notificationTitle = notification.title;

  const notificationOptions = {
    tag: jsonData.data.eventId,
    body: notification.body,
    data: jsonData.data
  };

  e.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

self.addEventListener('notificationclick', function (event) {
  const eventId = event.notification.data.eventId;
  
  const url = `https://dont-forget-nextjs.vercel.app/events/${eventId}/preference`;
  event.notification.close();

  event.waitUntil(clients.openWindow(url))
});
