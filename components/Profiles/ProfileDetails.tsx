'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTwitter, FaTwitch, FaTiktok, FaYoutube, FaUser } from 'react-icons/fa'

interface Props {
  name: string,
  email:string,
  country:string,
  contentType:string,
  image: string,
  platforms: {
    platform: string,
    followers: number,
    id: number,
  }[],
  id: number
}

const ProfileDetails = ({ name, email, country, contentType,  image, platforms, id }:Props) => {
  const [showDetails, setShowDetails] = React.useState(false)
  const [totalFollowers, setTotalFollowers] = React.useState(0)
  useEffect(()=> {
      let sum = 0;
      platforms.map(el => sum = sum + el.followers)
      setTotalFollowers(sum)
  })

  const clickHandler = () => {
      setShowDetails(!showDetails)
  }

  const PlatformIcon = (platform:string) => {
      switch(platform) {
        case 'Instagram':
            return <FaInstagram className={`text-3xl`}/>
        case 'Twitch':
            return <FaTwitch className={`text-3xl`}/>
        case 'Twitter':
          return <FaTwitter className={`text-3xl`}/>
        case 'Tiktok':
            return <FaTiktok className={`text-3xl`}/>
        case 'Youtube':
            return <FaYoutube className={`text-3xl`}/>
        case 'Facebook':
            return <FaFacebook className={`text-3xl`}/>
        default: return
      }
  }
  return (
    <div className={`bg-txt-primary w-full max-w-[90vw] h-fit p-2 ps-10 pe-10 rounded-2xl mt-2 mb-2 text-bg-primary`}>
        <div className={`flex flex-wrap justify-between`}>
          <div className={`flex border-b-[2px] border-black pb-2 w-[232px]`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center
              sm:w-14 sm:h-14 md:w-16 md:h-16 mt-auto mb-auto`}>
                  <FaUser className={`text-bg-primary w-12 h-auto`}/>
              </div>
              <div className={`flex flex-col justify-around items-start ml-2`}>
                  <p className={`text-xl font-bold`}>{name}</p>
                  <p className={`text-md`}>{email}</p>
                  <p className={`text-md`}>{country} | {contentType}</p>
              </div>
          </div>
          <div className={`flex items-center justify-center ml-4 mt-2 mb-2`}>
              <p className={`text-center`}>Followers in total: <br/>
              <b>{totalFollowers}</b></p>
          </div>
        </div>
        <div className={`flex justify-between flex-wrap items-center`}>
          <div className={`flex flex-wrap w-11/12 max-w-[232px] ${showDetails?'justify-between':'justify-start'} mt-2 ml-auto mr-auto sm:ml-0 cursor-pointer`}
          onClick={clickHandler}>
              {platforms.map(el => (
                <div className={`flex justify-center items-center m-auto sm:m-0`} key={el.id}>
                    <div className={`mr-2 ml-2 sm:mr-4 sm:ml-0 mt-[2px] mb-[2px]`}>
                      {PlatformIcon(el.platform)}
                    </div>
                    {showDetails ?
                    <p className={`text-center`}>Followers: <br/>
                    <b>{el.followers}</b></p>:<></>}
                </div>
              ))}
          </div>
          <div className={`m-2 ml-auto mr-auto`}>
              <Link href={`/profile=${id}`} className={`flex bg-txt-special border-2 border-txt-special p-1 pl-2 pr-2 rounded-full font-semibold text-lg text-txt-primary
                    hover:bg-txt-primary hover:text-txt-special cursor-pointer`} onClick={() => setShowDetails(false)}>
                    See Profile
              </Link>
          </div>
        </div>
    </div>
  )
}

export default ProfileDetails