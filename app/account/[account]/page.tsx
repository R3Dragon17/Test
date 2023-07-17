import React from 'react'
import { Header } from '@/components'

const Profile = () => {
  return (
    <div className="flex min-h-screen max-w-screen w-full flex-col items-center justify-start bg-bg-primary">
        <Header />
        <div className={`flex justify-center items-center pt-28 text-white`}>
            Account
        </div>
    </div>
  )
}

export default Profile