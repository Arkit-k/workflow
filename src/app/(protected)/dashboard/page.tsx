'use client'

import { useAuth } from '@clerk/nextjs'
import { ExternalLink, Github } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect } from 'react'
import useProject from '~/hooks/use-project'

const SyncUser = () => {
  const { project } = useProject()
  const { userId, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/')
    }
  }, [isLoaded, userId, router])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!userId) {
    return null // Will redirect via useEffect
  }

  return (
   <div>
    <div className='flex item-center justify-between flex-wrap gap-y-4'>
    <div className='w-fit rounded-md bg-primary px-4 py-3'>
      <div className='flex item-center'>
      <Github className='size-5 text-white'/>
      <div className='ml-2'>
        <p className='text-sm font-medium text-white'>{""}{project?.name}
          <Link href={project?.githubUrl ?? " "} className='inline-flex items-center text-white/80 hover:underline'>
          {project?.githubUrl}
          <ExternalLink className='ml-1 size-4' />
          </Link>
        </p>
      </div>
    </div>
    </div>
    <div className='flex items-center gap-4'>
      TeamMembers
      InviteButton
      ArchiveButton
    </div>
    <div className='flex items-center gap-4'>

    </div>
    </div>
    <div className='mt-4'>
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-5'>
      AskQustionCard
      MeetingCard
    </div>
    </div>
    <div className='mt-8'>
      connetlog
    </div>
  </div>
  )
}

export default SyncUser