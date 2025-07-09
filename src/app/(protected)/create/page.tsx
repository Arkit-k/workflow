"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'

type FormInput = {
      repourl: string
      projectName: string
      githubToken? : string
}

const Createpage = () => {
      
      const { register, handleSubmit, reset } = useForm<FormInput>();
      function onSubmit(data:FormInput) {
            window.alert(data)
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
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                  <input  {...register('repourl',{required: true})}
                  placeholder='ProjectName'
                  
                  />

            </form>
      </div>
   </div>

  )
}

export default Createpage