import { addSearchCriteria, deleteSearchCriteria } from "@/constants"

const criteria = {
    text: '',
    platform: [
        {Instagram: true},
        {Twitter: true},
        {Facebook: true},
        {Youtube: true},
        {Twitch: true},
        {Tiktok: true},
    ],
    followers: [
        {minTotal: 0, maxTotal: Infinity},
        {minInstagram: 0, maxInsagram: Infinity},
        {minTwitter: 0, maxTwitter: Infinity},
        {minFacebook: 0, maxFacebook: Infinity},
        {minYoutube: 0, maxYoutube: Infinity},
        {minTwitch: 0, maxTwitch: Infinity},
        {minTiktok: 0, maxTiktok: Infinity},
    ]
}

const searchReducer = (state:any=criteria, action:any) => {
    switch(action.type) {
        case addSearchCriteria:
            return state
        case deleteSearchCriteria:
            return state
        default: 
            return state
    }
}

export default searchReducer