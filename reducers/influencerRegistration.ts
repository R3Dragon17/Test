import { changeName, changeEmail, changeNickname, changePassword, changeCountry, changeContentType } from "@/constants"

const influencerData = {
    userName: '',
    userNickname: '',
    userEmail: '',
    userCountry: '',
    userContentType: '',
    userPassword: '',
    userPlatforms: [
        {
            id: 1,
            platform: 'Twitch',
            followers: 0,
        },
        {
            id: 2,
            platform: 'Instagram',
            followers: 0,
        }
    ],
}

const influencerRegisterReducer = (state:any=influencerData, action:any) => {
    switch(action.type) {
        case changeName:
            return {
                ...state,
                userName: action.payload
            }
        case changeNickname:
            return {
                ...state,
                userNickname: action.payload
            }
        case changeEmail:
            return {
                ...state,
                userEmail: action.payload
            }
        case changeCountry:
            return {
                ...state,
                userCountry: action.payload
            }
        case changeContentType:
            return {
                ...state,
                userContentType: action.payload
            }
        case changePassword:
            return {
                ...state,
                userPassword: action.payload
            }
        default: 
            return state
    }
}

export default influencerRegisterReducer