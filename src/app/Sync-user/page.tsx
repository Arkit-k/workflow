import { auth, clerkClient } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { db } from '~/server/db'


const SyncUser = async () => {
      const { userId } = await auth();
      if (!userId) {
            return redirect('/');
      }
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      if (!user.emailAddresses[0]?.emailAddress) {
            return notFound();
      }
      // Sync user in database
      await db.user.upsert({
            where: {
                  email: user.emailAddresses[0]?.emailAddress,
            },
            update: {
                  imageUrl: user.imageUrl,
                  firstName: user.firstName,
                  lastname: user.lastName,
            },
            create: {
                  id: userId,
                  email: user.emailAddresses[0]?.emailAddress ?? "",
                  imageUrl: user.imageUrl,
                  firstName: user.firstName,
            },
      });
      // After sign in and sync, render dashboard content
      return redirect('/dashboard');
}

export default SyncUser