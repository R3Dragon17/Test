'use client'
import React, { useState } from 'react'
import { Header } from '@/components'
import { FaFacebook, FaInstagram, FaTiktok, FaTwitch, FaTwitter, FaYoutube } from 'react-icons/fa'
import { useAppSelector, useDispatch } from '@/store'
import { changeName, changeEmail, changeNickname, changePassword, changeCountry, changeContentType } from '@/constants'
import bcrypt from 'bcryptjs'
import axios from 'axios'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [contentType, setContentType] = useState('')
  const [emailExists, setEmailExists] = useState(false)
  const [password, setPassword] = useState('')
  const [repeatedPassword, setRepeatedPassword] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(true)

  const dispatch = useDispatch()

    const collectInfluencerData = () => {
        if( firstName && lastName && nickname && email && country && contentType && password && passwordsMatch) {
            const name = `${firstName} ${lastName}`
            dispatch({type: changeName, payload: name})
            dispatch({type: changeNickname, payload: nickname})
            dispatch({type: changeEmail, payload: email})
            dispatch({type: changeCountry, payload: country})
            dispatch({type: changeContentType, payload: contentType})
            bcrypt.genSalt(12, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                  if (err) {
                    console.log(`ERR: ${err}`)
                  } else {
                    dispatch({ type: changePassword, payload: hash })
                  }
                })
            })
        }
        if(email) {
            axios.get(`http://localhost:5172/api/users/email=${email}`)
            .then(data => {
                if(data.data !== null) {
                    setEmailExists(true)
                } else {
                    setEmailExists(false)
                }
            })
        } else {
            setEmailExists(false)
        }

    }

  const registerInfluencer = async () => {
        console.log(influencer)
        console.log(emailExists)
        axios.post(`http://localhost:5172/api/influencer/register`, influencer)

    }
    const influencer = useAppSelector(state => state.influencerRegister)
  const platforms =[{platform:'Instagram', id: 1}, {platform:'Twitter', id: 2}, {platform:'Facebook', id: 3}, {platform:'Tiktok', id: 4}, {platform:'Youtube', id: 5}, {platform:'Twitch', id: 6}]

  const PlatformIcon = ({ platform }:any) => {
    switch(platform.platform) {
      case 'Instagram':
          return <FaInstagram className={`text-bg-primary text-3xl font-semibold ml-2 mr-2 cursor-pointer hover:opacity-80`} key={platform.id}/>
      case 'Twitch':
          return <FaTwitch className={`text-bg-primary text-3xl font-semibold ml-2 mr-2 cursor-pointer hover:opacity-80`} key={platform.id}/>
      case 'Twitter':
        return <FaTwitter className={`text-bg-primary text-3xl font-semibold ml-2 mr-2 cursor-pointer hover:opacity-80`} key={platform.id}/>
      case 'Tiktok':
          return <FaTiktok className={`text-bg-primary text-3xl font-semibold ml-2 mr-2 cursor-pointer hover:opacity-80`} key={platform.id}/>
      case 'Youtube':
          return <FaYoutube className={`text-bg-primary text-3xl font-semibold ml-2 mr-2 cursor-pointer hover:opacity-80`} key={platform.id}/>
      case 'Facebook':
          return <FaFacebook className={`text-bg-primary text-3xl font-semibold ml-2 mr-2 cursor-pointer hover:opacity-80`} key={platform.id}/>
      default: return
    }
  }

  const handleSubmit = async () => {
        if(passwordsMatch && !emailExists) {
            registerInfluencer() 
        }
  }

  return (
    <div className="flex min-h-screen max-w-screen w-full flex-col items-center justify-start bg-bg-primary">
        <Header />
        <div className={`flex flex-col items-center h-screen mt-auto mb-auto`}>
            <p className={`m-0 text-white mt-[100px] text-3xl font-bold`}>Become visible for other brands</p>
            <form className={`bg-txt-primary p-4 rounded-3xl flex flex-col items-center justify-center mt-[20px] mb-auto`} onSubmit={handleSubmit}>
                <div className={`flex mb-2`}>
                    <input className={`bg-bg-primary text-txt-primary rounded-full h-10 focus:outline-none p-2 pl-4 pr-4 w-full m-2 max-w-[182px]`}
                    type='text' onChange={e => setFirstName(e.target.value)} placeholder='First Name*' onBlur={collectInfluencerData} required/>
                    <input className={`bg-bg-primary text-txt-primary rounded-full h-10 focus:outline-none p-2 pl-4 pr-4 w-full m-2 max-w-[182px]`}
                    type='text' onChange={(e => setLastName(e.target.value))} placeholder='Last Name*' onBlur={collectInfluencerData} required/>
                </div>
                <div className={`max-w-[380px] w-full mb-4`}>
                    <input className={`bg-bg-primary text-txt-primary rounded-full h-10 focus:outline-none p-2 pl-4 pr-4 w-full max-w-[380px] m-auto mb-0 mt-4`}
                    type='text' onChange={e => setNickname(e.target.value)} placeholder='nickname*' onBlur={collectInfluencerData} maxLength={16} required/>
                </div>
                <div className={`max-w-[380px] w-full mb-1`}>
                    <input className={`bg-bg-primary text-txt-primary rounded-full h-10 focus:outline-none p-2 pl-4 pr-4 w-full max-w-[380px] m-auto mb-0 mt-4 
                    ${emailExists?'border-red-700 border-2 border-solid':''}`}
                    type='email' onChange={e => setEmail(e.target.value)} placeholder='email*' onBlur={() => {
                        collectInfluencerData()
                    }} required/>
                    {emailExists ? <p className={`text-red-700 m-0 txt-sm p-0 pl-4 font-medium`}>Email is already used</p>
                    : <p className={`text-gray-500 m-0 txt-sm font-light p-0 pl-4`}>Email will be displayed as a contact information</p>}
                </div>
                <div className={`max-w-[380px] w-full mb-1`}>
                    <input className={`bg-bg-primary text-txt-primary rounded-full h-10 focus:outline-none p-2 pl-4 pr-4 w-full max-w-[380px] m-auto mb-0 mt-4`}
                    type='text' onChange={e => setCountry(e.target.value)} placeholder='country (in English)*' onBlur={() => {
                        collectInfluencerData()
                    }} required/>
                </div>
                <div className={`max-w-[380px] w-full mb-1`}>
                    <input className={`bg-bg-primary text-txt-primary rounded-full h-10 focus:outline-none p-2 pl-4 pr-4 w-full max-w-[380px] m-auto mb-0 mt-4`}
                    type='text' onChange={e => setContentType(e.target.value)} placeholder='content type*' onBlur={() => {
                        collectInfluencerData()
                    }} required/>
                </div>
                <div className={`max-w-[380px] w-full mb-1`}>
                    <input className={`bg-bg-primary text-txt-primary rounded-full h-10 focus:outline-none p-2 pl-4 pr-4 w-full max-w-[380px] m-auto mb-0 mt-4`}
                    type='password' onChange={e => setPassword(e.target.value)} placeholder='password*' onBlur={e => {
                        if(repeatedPassword !== password && repeatedPassword) {
                                setPasswordsMatch(false)
                        } else {
                            setPasswordsMatch(true)
                        } collectInfluencerData()
                    }} required minLength={8}/>
                    <p className={`text-gray-500 m-0 txt-sm font-light p-0 pl-4`}>Passwords needs to be at least 8 char long</p>
                </div>
                <div className={`max-w-[380px] w-full mb-4`}>
                    <input className={`bg-bg-primary text-txt-primary rounded-full h-10 focus:outline-none p-2 pl-4 pr-4 w-full max-w-[380px] m-auto mb-0 mt-4`}
                    type='password' onChange={e => setRepeatedPassword(e.target.value)} onBlur={e => {
                        if(repeatedPassword !== password) {
                                setPasswordsMatch(false)
                        } else {
                            setPasswordsMatch(true)
                        } collectInfluencerData()
                    }} placeholder='submit password*' minLength={8}/>
                    {!passwordsMatch && <p className={`text-red-700 m-0 txt-sm font-medium p-0 pl-4`}>Passwords needs to match</p>}
                </div>
                <div className={`flex flex-col mb-4 justify-between w-11/12`}>
                    <p className='ml-auto mr-auto mb-2 text-lg font-medium text-bg-primary'>connected: 0</p>
                    <div className={`flex flex-wrap justify-between w-full`}>
                        {platforms.map(platform => (
                            <PlatformIcon platform={platform} key={platform.id}/>
                        ))}
                    </div>
                </div>
                <div className={`text-bg-primary text-md font-medium w-11/12 max-w-[380px] mb-4 text-center`}>
                    <i>{`By registering I accept privacy policy`}</i>
                </div>
                <div className={`w-full max-w-[380px] flex items-center justify-center`}>
                    <button type='submit' className={`flex bg-txt-special border-2 border-txt-special p-1 pl-2 pr-2 rounded-full font-semibold text-lg 
                    hover:bg-txt-primary hover:text-txt-special cursor-pointer`}>4.99$/month</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register