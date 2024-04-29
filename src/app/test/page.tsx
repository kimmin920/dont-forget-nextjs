// src/app/test/page.server.tsx

import { PrismaClient, User } from '@prisma/client';
import { Suspense } from 'react';

// Asynchronous function to fetch users
async function fetchUsers(): Promise<User[]> {
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  } finally {
    prisma.$disconnect();
  }
}

// Server Component
export default async function Page() {
  const users = await fetchUsers(); // This would be called at runtime on the server
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1>List of Users</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              Name: {user.name}, Email: {user.email}, Age: {user.age}
            </li>
          ))}
        </ul>
      </div>
    </Suspense>
  );
}
