import { auth, clerkClient } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { db } from '~/server/db'


const SyncUser = async () => {
  const { userId } = await auth();
  if (!userId) return redirect('/');

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const email = user.emailAddresses[0]?.emailAddress;

  if (!email) return notFound();

  // Sync user
  const dbUser = await db.user.upsert({
    where: { clerkUserId: userId },  // Match Clerk's ID
    update: {
      email,  // Update email if changed
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,  // Fixed typo
    },
    create: {
      clerkUserId: userId,
      email,
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
      credits: 150,  // Default value
    },
  });

  return dbUser;  // Or redirect if needed
};

export default SyncUser