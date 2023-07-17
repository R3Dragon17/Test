'use client'
import { RootState, useDispatch, useAppSelector } from '@/store'
import { Header, ProfileDetails } from '@/components'
import { useEffect, useState } from 'react'
import { FaSearch, FaSlidersH } from 'react-icons/fa'
import axios from 'axios'
import { influencerInterface } from '@/interfaces/influencer'

export default function Home() {
  const users = [
    {userName: 'UserName', userNickname:'UserNickname', userEmail:'mymail@email.com', userImage: 'IMG', platforms:[{platform:'Twitch', followers:45171, id:1}, {platform:'Instagram', followers:71203, id:2}, {platform:'Twitter', followers: 541278, id:3}], id:1},
    {userName: 'UserName', userNickname:'UserNickname', userEmail:'mymail@email.com', userImage: 'IMG', platforms:[{platform:'Twitch', followers:45171, id:1}, {platform:'Instagram', followers:71203, id:2}], id:2},
    {userName: 'UserName', userNickname:'UserNickname', userEmail:'mymail@email.com', userImage: 'IMG', platforms:[{platform:'Twitch', followers:45171, id:1}, {platform:'Instagram', followers:71203, id:2}], id:3},
    {userName: 'UserName', userNickname:'UserNickname', userEmail:'mymail@email.com', userImage: 'IMG', platforms:[{platform:'Twitch', followers:45171, id:1}, {platform:'Instagram', followers:71203, id:2}], id:4},
    {userName: 'UserName', userNickname:'UserNickname', userEmail:'mymail@email.com', userImage: 'IMG', platforms:[{platform:'Twitch', followers:45171, id:1}, {platform:'Instagram', followers:71203, id:2}], id:5},
    {userName: 'UserName', userNickname:'UserNickname', userEmail:'mymail@email.com', userImage: 'IMG', platforms:[{platform:'Twitch', followers:45171, id:1}, {platform:'Instagram', followers:71203, id:2}, {platform:'Twitter', followers: 541278, id:3}], id:6},
    {userName: 'UserName', userNickname:'UserNickname', userEmail:'mymail@email.com', userImage: 'IMG', platforms:[{platform:'Twitch', followers:45171, id:1}, {platform:'Instagram', followers:71203, id:2}], id:7},
    {userName: 'UserName', userNickname:'UserNickname', userEmail:'mymail@email.com', userImage: 'IMG', platforms:[{platform:'Twitch', followers:45171, id:1}, {platform:'Instagram', followers:71203, id:2}], id:8},
    {userName: 'UserName', userNickname:'UserNickname', userEmail:'mymail@email.com', userImage: 'IMG', platforms:[{platform:'Twitch', followers:45171, id:1}, {platform:'Instagram', followers:71203, id:2}], id:9},
    {userName: 'UserName', userNickname:'UserNickname', userEmail:'mymail@email.com', userImage: 'IMG', platforms:[{platform:'Twitch', followers:45171, id:1}, {platform:'Instagram', followers:71203, id:2}], id:10},
  ]
  const [country, setCountry] = useState('')
  const [profiles, setProfiles] = useState<influencerInterface[]>([])
  const count = useAppSelector(state => state.search)

  const getUserLocation = () => {
    axios.get('https://geolocation-db.com/json/62d8d690-e7b8-11ed-8c81-cbb990727ab5')
      .then(response => {
        const data = response.data
        console.log(data)
        return data.country_name
      })
      .catch(error => {
        console.error(error)
      });
  }

  const getUsers = () => {
      axios.get(`http://localhost:5172/api/users/`)
          .then((data:any) => {
            if(Array.isArray(data.data)) {
              setProfiles(data.data)
            } else { 
              setProfiles([data.data])
            }
          })
  }
  useEffect(() => {
    getUsers()
  },[])

  console.log(profiles)
  return (
    <div className="flex min-h-screen max-w-screen w-full flex-col items-center justify-start bg-bg-primary">
        <Header />
        <div className={`flex flex-col w-11/12 max-w-fit min-h-[90vh] items-center justify-start bg-bg-primary mt-20 mb-10 rounded-3xl p-20 pt-5 pb-5 ml-auto mr-auto z-0]`}>
            <div className={`flex w-full min-w-[220px] p-2 pe-4 ps-4 items-center justify-start bg-txt-primary rounded-full ml-auto mr-auto mb-4`}>
                <FaSearch className={`text-bg-primary mr-2`}/>
                <input className={`focus:outline-none bg-inherit text-bg-primary w-full min-w-[200px]`} placeholder='Search'/>
            </div>
            <div className={`h-full`}>
            {Array.isArray(profiles) && profiles.length > 0 && profiles[0] !== null ?  profiles.map(profile => (
                  <ProfileDetails name={profile.userNickname} country={profile.userCountry} contentType={profile.userContentType} email={profile.userEmail} image={'IMG'} platforms={profile.userPlatforms} id={profile._id} key={profile._id}/>
              )): (
                <div className={`flex-col items-center justify-center`}>
                <p className={`text-2xl mx-auto my-4 text-gray-500 font-semibold text-center`}> No users found </p>
                {users.map(user => (
                  <ProfileDetails name={user.userNickname} country='Country' contentType='Content Type' email={user.userEmail} image={'IMG'} platforms={user.platforms} id={1} key={user.id} />
              ))}</div>)}</div>
        </div>
    </div>
  )
}