import { initializeApp } from 'firebase/app';

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'dont-forget-ace34.firebaseapp.com',
  projectId: 'dont-forget-ace34',
  storageBucket: 'dont-forget-ace34.appspot.com',
  messagingSenderId: '1042202960910',
  appId: process.env.FIREBASE_APP_ID,
  measurementId: 'G-622G56FMPB',
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
