const axios = require('axios')
const getFollows = require('follower-count')
const { channelId } = require('@gonetone/get-youtube-id-by-url')

const BASE_EMAIL_INS = "ndhieuvegia983@gmail.com"
const BASE_PASSWORD_INS = "Hieu0976930983@"
const BASE_DOMAIN_TWI = "https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names="
const BASE_DOMAIN_YTB = "https://www.googleapis.com/youtube/v3/channels?part=statistics&"
const API_KEY = "AIzaSyCrHTFjvU0x7CBwzPCw-_S-2i2whd99nwo"

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
        let channel_id
        await channelId(url).then((id) => {
            if(id) {
                channel_id = id
            }
        })

        const channelInfo = await axios({
            method: 'get',
            url: `${BASE_DOMAIN_YTB}id=${channel_id}&key=${API_KEY}`
        })
        let statisticsData = channelInfo.data.items[0].statistics;
        let count = statisticsData.subscriberCount;
        console.log('Subscriber COUNT: ' + count)
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
const callFollows = async (socialType, value) => {
    try {
        switch(socialType){
            case "tiktok":
                runTiktok(value)
                break;
            case "youtube":
                runYoutube(value)
                break
            case "instagram":
                runInstagram(value)
                break
            default:
                runTwitter(value)
        }
    } catch (err) {
        console.log(err)
    }
}

/*With social is Youtube => value is URL*/
callFollows('youtube', 'https://www.youtube.com/channel/UCFPvOrXByhC4KxWEGTJcsPA')