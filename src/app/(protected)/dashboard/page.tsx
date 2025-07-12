'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
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
      <h1>{project?.name || 'No project selected'}</h1>
    </div>
  )
}

export default SyncUser