import React from 'react'
import { Header } from '@/components'

const Profile = () => {
  return (
    <div className="flex min-h-screen max-w-screen w-full flex-col items-center justify-start bg-bg-primary">
        <Header />
        <div className={`pt-20 text-white flex justify-center`}>
            This is PROFILE PAGE
        </div>
    </div>
  )
}

export default Profile