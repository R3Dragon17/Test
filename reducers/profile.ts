import { LoginProfileContentType, LoginProfileCountry, LoginProfileEmail, LoginProfileID, LoginProfileLogged, LoginProfileName, LoginProfileNickname, LoginProfilePlatforms, Logout } from "@/constants"

const profileData = {
    profileName: 'Guest',
    profileNickname: 'guest',
    profileEmail: 'example@mail.com',
    profileCountry: 'USA',
    profileContentType: '???',
    profilePlatforms: [],
    profileLogged:false,
    profileID: 0,
}

const profileReducer = (state:any=profileData, action:any) => {
    switch(action.type) {
        case LoginProfileName:
            return {
                ...state,
                profileName: action.payload
            }
        case LoginProfileNickname:
            return {
                ...state,
                profileNickname: action.payload
            }
        case LoginProfileEmail:
            return {
                ...state,
                profileEmail: action.payload
            }
        case LoginProfileCountry:
            return {
                ...state,
                profileCountry: action.payload
            }
        case LoginProfileContentType:
            return {
                ...state,
                profileContentType: action.payload
            }
        case LoginProfilePlatforms:
            return {
                ...state,
                profilePlatforms: action.payload
            }
        case LoginProfileID:
            return {
                ...state,
                profileID: action.payload
            }
        case LoginProfileLogged:
            return {
                ...state,
                profileLogged: true
            }
        case Logout: 
            return profileData
        default:
            return state
    }
}

export default profileReducer