/** @type {import('next').NextConfig} */
import PWA from 'next-pwa';

const withPWA = PWA({
  dest: 'public',
  // disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {};

export default withPWA(nextConfig);
