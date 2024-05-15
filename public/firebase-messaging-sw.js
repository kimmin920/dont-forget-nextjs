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

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;

  const notificationOptions = {
    body: resultData.body,
  };

  console.log(resultData.title, {
    body: resultData.body,
  });

  e.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

self.addEventListener('notificationclick', function (event) {
  const url = '/';
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
