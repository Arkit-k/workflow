import { auth, clerkClient } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { db } from '~/server/db'



const SyncUser = async () => {
      const { userId } = await auth();
      if (!userId) {
            // If not signed in, redirect to sign-in page
            return redirect('/');
      }
      return (
            <div><h1>we are synced</h1></div>
      );
}

export default SyncUser