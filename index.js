const axios = require('axios')
const getFollows = require('follower-count')

const BASE_EMAIL_INS = "ndhieuvegia983@gmail.com"
const BASE_PASSWORD_INS = "Hieu0976930983@"
const BASE_DOMAIN_TWI = "https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names="

/**Get follows count from instagram */
const runInstagram = async (name) => {
    try {
        let count = await getFollows.getFollowerCount({
            type: 'instagram',
            username: name,
            sessionId: await getFollows.getIgSessionId(BASE_EMAIL_INS,BASE_PASSWORD_INS)
        })
        console.log('FOLLOWS COUNT: ' + count) 
    } catch (err) {
        console.log(err)
    }
}

/**Get follows count from Youtube */
const runYoutube = async (url) => {
    try {
        let count = await getFollows.getFollowerCount({
            type: 'youtube',
            channel: url
        })
        console.log('FOLLOWS COUNT: ' + count)
    } catch (err) {
        console.log(err)
    }
}

/**Get follows count from Twitter */
const runTwitter = async (name) => {
    try {
        const userInfo = await axios({
            method: 'get',
            url: `${BASE_DOMAIN_TWI}${name}`
        })

        let followsCount = userInfo.data[0].followers_count; 
        console.log('FOLLOWS COUNT: ' + followsCount)         
    } catch (err) {
        console.log(err)
    }
}

/**Get follows count from Tiktok */
const runTiktok = async (name) => {
    try {
        let count = await getFollows.getFollowerCount({
            type: 'tiktok',
            username: name
        })
        console.log('FOLLOWS COUNT: ' + count)
    } catch (err) {
        console.log(err)
    }
}

/**Call Follows count */
const callFollows = async (socialType, name) => {
    try {
        switch(socialType){
            case "tiktok":
                runTiktok(name)
                break;
            case "youtube":
                runYoutube(name)
                break
            case "instagram":
                runInstagram(name)
                break
            default:
                runTwitter(name)
        }
    } catch (err) {
        console.log(err)
    }
}


callFollows('twitter', 'baolinh2003')