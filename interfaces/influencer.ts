export interface influencerInterface {
    _id: number,
    userName: string,
    userNickname: string,
    userEmail: string,
    userCountry: string,
    userContentType: string,
    userPlatforms: {
        id: number,
        platform: string,
        followers: number
    }[]
}