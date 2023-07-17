'use client'
import React, { useState } from 'react'
import { Header } from '@/components'
import { useAppSelector, useDispatch } from '@/store'
import { LoginProfileContentType, LoginProfileCountry, LoginProfileEmail, LoginProfileID, LoginProfileLogged, LoginProfileName, LoginProfileNickname, LoginProfilePlatforms, changeEmail, changePassword } from '@/constants'
import bcrypt from 'bcryptjs'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verifyEmail, setVerifyEmail] = useState(true)
  const [loginFailed, setLoginFailed] = useState(false)

    const dispatch = useDispatch()


  const checkEmail = () => {
    axios.get(`http://localhost:5172/api/users/email=${email}`)
        .then(res => {
          if(res.data !== null) {
              setVerifyEmail(true)
          } else {
              setVerifyEmail(false)
          }
        })
  }

  const collectInfluencerData = () => {
        if(email && password && verifyEmail) {
            if(axios.get(`http://localhost:5172/api/users/email=${email}`) !== null) {
              dispatch({ type: changeEmail, payload: email})
              dispatch({ type: changePassword, payload: password })
            } else {
              console.log(`EMAIL DOESNT EXIST`)
            }
        }
  }
const login = () => {
      let encodedPass:string
      let data:any
      axios.get(`http://localhost:5172/api/users/email=${email}`)
        .then(res => {
          if(res.data !== null) {
            encodedPass = res.data.userPassword
            data = res.data
          }
        })
        .then(() => {
          bcrypt.compare(password, encodedPass, (err, result) => {
              if(err) {
                console.log(`ERR: ${err}`)
              } else if(result) {
                console.log(`LOGIN SUCCESSFUL`)
                dispatch({type: LoginProfileName, payload: data.userName})
                dispatch({type: LoginProfileNickname, payload: data.userNickname})
                dispatch({type: LoginProfileEmail, payload: data.userEmail})
                dispatch({type: LoginProfileCountry, payload: data.userCountry})
                dispatch({type: LoginProfileContentType, payload: data.userContentType})
                dispatch({type: LoginProfilePlatforms, payload: data.userPlatforms})
                dispatch({type: LoginProfileID, payload: data._id})
                dispatch({type: LoginProfileLogged})
                setLoginFailed(false)
              } else {
                console.log(`LOGIN FAILED`)
                setLoginFailed(true)
              }
          })
        })
  }

  const handleSubmit = (e:any) => {
        e.preventDefault()
        if(verifyEmail) {
          login()
        }
  }

  return (
    <div className="flex min-h-screen max-w-screen w-full flex-col items-center justify-start bg-bg-primary">
        <Header />
        <div className={`flex items-center max-w-[500px] w-full h-screen p-[20px] m-auto`}>
            <form className={`bg-txt-primary ${useAppSelector(state => state.profile.profileLogged)?'border-green-600 border-[10px]':''} w-[90%] p-4 
            rounded-3xl flex flex-col items-center justify-center m-auto`} onSubmit={handleSubmit}>
              {useAppSelector(state => state.profile.profileLogged)?<>
              <div className={`h-[200px] flex text-center items-center text-green-600 text-3xl font-bold`}>
                  SUCCESSFULLY LOGGED IN
              </div>
              </>:<>
                {loginFailed && <p className={`text-red-700 text-center text-base font-medium`}>Email or Password is invalid</p>}
                <div className={`max-w-[500px] w-full mb-4`}>
                    <input className={`bg-bg-primary text-txt-primary ${loginFailed || !verifyEmail && 'border-red-700 border-[2px]'} rounded-full h-10 focus:outline-none p-2 pl-4 pr-4 w-full max-w-[380px] m-auto mb-0 mt-4`}
                    type='email' onChange={e => setEmail(e.target.value)} placeholder='email' onBlur={() => {
                      checkEmail()
                      collectInfluencerData()
                      }} onFocus={() => setVerifyEmail(true)}
                      required/>
                      {!verifyEmail && <p className={`text-red-700 m-0 txt-sm p-0 pl-4 font-medium`}>Email invalid</p>}
                </div>
                <div className={`max-w-[500px] w-full mb-4`}>
                    <input className={`bg-bg-primary text-txt-primary rounded-full ${loginFailed && 'border-red-700 border-[2px]'} h-10 focus:outline-none p-2 pl-4 pr-4 w-full max-w-[380px] m-auto mb-0 mt-4`}
                    type='password' onChange={e => setPassword(e.target.value)} placeholder='password' required minLength={8} onBlur={collectInfluencerData}/>
                </div>
                <p className={`w-11/12 max-w-[380px] text-bg-primary text-sm font-normal text-right mb-2 hover:underline cursor-pointer`}>Forgot password?</p>
                <div className={`w-full max-w-[380px] flex items-center justify-end`}>
                    <button type='submit' className={`flex bg-txt-special border-2 border-txt-special p-1 pl-2 pr-2 rounded-full font-semibold text-lg 
                    hover:bg-txt-primary hover:text-txt-special cursor-pointer`}>Log in</button>
                </div>
                </>}
            </form>
        </div>
    </div>
  )
}

export default Login