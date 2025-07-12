"use client"
import React from 'react'
import { api } from "../../../trpc/react"
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { toast } from 'sonner'

type FormInput = {
      repourl: string
      projectName: string
      githubToken? : string
}

const Createpage = () => {
      
      const { register, handleSubmit, reset } = useForm<FormInput>();
      const createProject = api.project.createProject.useMutation()
      function onSubmit(data:FormInput) {
            //
            createProject.mutate({
                  githubUrl:data.repourl,
                  name:data.projectName,
                  githubToken:data.githubToken
            },{
                  onSuccess:() =>{
                        toast.success('project created successfully')
                        reset()
                  },
                  onError: () => {
                        toast.error('failed to create project')
                  }
            })
            return true
      }
      return(
  // Example usage to avoid unused variable errors
   <div className='flex items-center gap-12 h-full justify-center'>
      <Image src="/illustration.png" alt="Illustration" width={224} height={224} className="h-56 w-auto"/>
      <div>
            <div>
                  <h1 className='font-semibold text-2xl'>
                    Link your Github Repository
                  </h1>
                  <p className='text-sm text-muted-foreground'>
                        Enter the url of the Repository to link it to workflow
                  </p>
                  <div className='h-4'></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                  <Input  {...register('projectName',{required: true})}
                  placeholder='Project  Name'
                  />
                  <div className='h-2'></div>
                  <Input  {...register('repourl',{required: true})}
                  placeholder='Repo url'
                  />
                  <div className='h-2'></div>
                  <Input  {...register('githubToken')}
                  placeholder='Github Token (optional)'
                  />
                  <div className='h-4 mt-3'>
                        <Button type='submit' disabled={createProject.isPending}>
                              Create Project
                        </Button>
                  </div>
            </form>
      </div>
   </div>

  )
}

export default Createpage