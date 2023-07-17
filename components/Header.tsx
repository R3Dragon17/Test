'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaUser, FaInstagram, FaTwitch, FaTwitter, FaTiktok, FaYoutube, FaFacebook, FaBan, FaAngleRight, FaGlobe, FaAddressCard, FaHouseUser, FaSearch,
FaHome, 
FaOutdent} from 'react-icons/fa'
import { useAppSelector, useDispatch } from '@/store'
import { Logout } from '@/constants'

const Header = () => {
  const [menu, setMenu] = useState(false)
  const platforms =[{platform:'Instagram', id: 1}, {platform:'Twitter', id: 2}, {platform:'Facebook', id: 3}, {platform:'Tiktok', id: 4}, {platform:'Youtube', id: 5}, {platform:'Twitch', id: 6}]
  const PlatformIcon = (platform:string) => {
    switch(platform) {
      case 'Instagram':
          return <FaInstagram className={``}/>
      case 'Twitch':
          return <FaTwitch className={``}/>
      case 'Twitter':
        return <FaTwitter className={``}/>
      case 'Tiktok':
          return <FaTiktok className={``}/>
      case 'Youtube':
          return <FaYoutube className={``}/>
      case 'Facebook':
          return <FaFacebook className={``}/>
      default: return
    }
  }

  const pathname = usePathname()
  const path = pathname.substring(pathname.lastIndexOf('/'))

  const dispatch = useDispatch()

  useEffect(() => {
    const handleResize = () => {
      if (window.screen.availWidth >= 1200) {
        setMenu(true)
      } else {
        setMenu(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const PlatformSection = ({platform}:any) => {
    const [linkActive, setLinkActive] = useState(false)
    const [linkDisabled, setLinkDisabled] = useState(false)
    const linkClick = () => {
      setLinkActive(!linkActive)
      setLinkDisabled(false)
  }
  return (
    <div className='flex w-[216px] justify-between items-center' key={platform.id}>
      <div className={`flex items-center text-xl cursor-pointer hover:opacity-80 ${linkActive?'text-txt-special':'text-bg-primary'}`}
      onClick={linkClick}>
          {PlatformIcon(platform.platform)}
          <p className={`font-semibold ml-2`}>{platform.platform}</p>
      </div>
      <FaBan className={`text-gray-500 text-xl cursor-pointer hover:text-red-400 ${linkDisabled?'text-red-700':''}`} onClick={() => {setLinkDisabled(!linkDisabled);setLinkActive(false)}}/>
    </div>
    )
  }

  const FollowersSection = ({platform}:any) => {
    const [open, setOpen] = useState(false)
  return (
    <div className={`w-[216px] mt-2`} key={platform.id}>
      <div className={`flex items-center text-xl cursor-pointer text-bg-primary hover:opacity-80`}
      onClick={()=>setOpen(!open)}>
          {PlatformIcon(platform.platform)}
          <p className={`font-semibold ml-2`}>{platform.platform}</p>
          <FaAngleRight />
      </div>
      {open?
      <div className={`flex justify-between w-[216px]`}>
          <div className={``}>
              <p className={`text-bg-primary text-center font-medium`}>More than</p>
              <input className={`text-center font-semibold bg-bg-primary rounded-full w-[100px] h-[30px] focus:outline-none focus:text-txt-special`} placeholder='number'/>
          </div>
          <div className={``}>
              <p className={`text-bg-primary text-center font-medium`}>Less than</p>
              <input className={`text-center font-semibold bg-bg-primary rounded-full w-[100px] h-[30px] focus:outline-none focus:text-txt-special`} placeholder='number'/>
          </div>
      </div>:<></>}
    </div>
    )
  }

  const pressMenuBtn = () => setMenu(!menu)
  return (
    <div className={`fixed w-full min-h-16 h-16 bg-bg-primary grid grid-cols-3 pr-8 pl-8`}>
        <div className={`w-10 h-8 flex col-span-1 flex-col justify-between mt-auto mb-auto items-center hover:opacity-80 z-50 cursor-pointer`} onClick={pressMenuBtn}>
            <div className={`w-full h-1.5  rounded-md transition duration-400 ease-in ${menu?'rotate-[45deg] translate-x-[-9px] translate-y-[13px] bg-bg-primary':'bg-txt-primary'}`}/>
            <div className={`w-full h-1.5 bg-txt-primary rounded-md transition duration-400 ease-in ${menu?'opacity-0':''}`}/>
            <div className={`w-full h-1.5 rounded-md transition duration-400 ease-in ${menu?'rotate-[-45deg] translate-x-[-10px] translate-y-[-12px] bg-bg-primary':'bg-txt-primary'}`}/>
        </div>
        <Link href={`/`} className={`col-span-1 flex justify-center items-center hover:opacity-80`}>
        <Image
        src={`/assets/BrandScoutr-light.webp`}
        alt='BrandScoutr'
        width={50} height={50} style={{ zIndex: 1 }}/></Link>
        {useAppSelector(state => state.profile.profileLogged)?
        <Link href={`/account/account`}
        className={`col-span-1 w-full flex justify-end items-center hover:opacity-80 cursor-pointer`}>
            <div className={`hidden mr-2 md:block`}>
                <p className={`text-xl font-semibold text-right`}>Hi, {useAppSelector(state => state.profile.profileNickname)}</p>
                <p className={`text-base font-normal text-right`}>{useAppSelector(state => state.profile.profileEmail)}</p>
            </div>
            <FaUser className={`w-10 h-10`}/>
        </Link>
        :
        <div className={`col-span-1 w-full flex justify-end items-center cursor-pointer`}>
        <div className={`hidden mr-2 md:block`}>
            <p className={`text-xl font-semibold text-right`}>Hi, {useAppSelector(state => state.profile.profileNickname)}</p>
            <p className={`text-base font-normal text-right`}>{useAppSelector(state => state.profile.profileEmail)}</p>
        </div>
        <FaUser className={`w-10 h-10`}/>
        </div>}
        <div className={`fixed h-full min-h-screen left-0 bg-txt-primary pt-[64px] pl-8 pb-2 z-0 transition duration-400 ease-in ${menu?'max-w-[280px] w-full':'hidden w-0'} overflow-auto`}>
            <div className={`flex flex-col justify-between items-start`}>
                <div>
                    <div className={`mt-4`}>
                        <p className={`text-gray-500 text-xl font-medium`}>Platforms</p>
                        <div>
                            {platforms.map(platform => (
                                <PlatformSection platform={platform} key={platform.id}/>
                            ))}
                        </div>
                    </div>
                    <div className={`mt-4`}>
                        <p className={`text-gray-500 text-xl font-medium`}>Followers</p>
                        <div>
                            <div className={``}>
                              <div className={`flex items-center text-xl text-bg-primary`}>
                                  <FaGlobe />
                                  <p className={`font-semibold ml-2`}>Total</p>
                              </div>
                              <div className={`flex justify-between w-[216px]`}>
                                  <div className={``}>
                                      <p className={`text-bg-primary text-center font-medium`}>More than</p>
                                      <input className={`text-center font-semibold bg-bg-primary rounded-full w-[100px] h-[30px] focus:outline-none focus:text-txt-special`} placeholder='number'/>
                                  </div>
                                  <div className={``}>
                                      <p className={`text-bg-primary text-center font-medium`}>Less than</p>
                                      <input className={`text-center font-semibold bg-bg-primary rounded-full w-[100px] h-[30px] focus:outline-none focus:text-txt-special`} placeholder='number'/>
                                  </div>
                              </div>
                            </div>
                            {platforms.map(platform => (
                              <FollowersSection platform={platform} key={platform.id}/>
                            ))}
                        </div>
                    </div>
                    <div className={`mt-4 mb-6 w-full`}>
                        <button className={`flex items-center justify-center bg-txt-special border-2 border-txt-special p-1 pl-2 pr-2 rounded-full font-semibold text-lg 
                        hover:bg-txt-primary hover:text-txt-special cursor-pointer`}>
                        <FaSearch className={`mr-2`}/>Search</button>
                    </div>
                </div>
                <div className={`mt-4`}>
                    <p className={`text-gray-500 text-xl font-medium`}>Navigation</p>
                    <div className={``}>
                        <Link href={`/`} className={`flex items-center mt-2 ${path === '/'?'text-txt-special':'text-bg-primary'} text-xl font-semibold hover:opacity-80`}>
                              <FaHome />
                              <p className={`ml-2`}>Home</p>
                        </Link>
                        {useAppSelector(state => state.profile.profileLogged)?
                        <>
                        <Link href={`/account/account`}
                        className={`flex items-center mt-2 ${path === '/account'?'text-txt-special':'text-bg-primary'} text-xl font-semibold hover:opacity-80`}>
                            <FaUser />
                            <p className={`ml-2`}>Account</p>
                        </Link>
                        <button className={`flex items-center mt-2 text-bg-primary text-xl font-semibold hover:opacity-80`} onClick={() => {
                          dispatch({type: Logout})
                        }}>
                            <FaOutdent />
                            <p className={`ml-2`}>Log out</p>
                        </button>
                        </>:
                        <>
                        <Link href={`/influencers/login`} className={`flex items-center mt-2 ${path === '/login'?'text-txt-special':'text-bg-primary'} text-xl font-semibold hover:opacity-80`}>
                              <FaHouseUser />
                              <p className={`ml-2`}>Login</p>
                        </Link>
                        <Link href={`/influencers/register`} className={`flex items-center mt-2 ${path === '/register'?'text-txt-special':'text-bg-primary'} text-xl font-semibold hover:opacity-80`}>
                              <FaAddressCard />
                              <p className={`ml-2`}>Register</p>
                        </Link></>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header