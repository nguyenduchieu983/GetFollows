const axios = require('axios')
const getFollows = require('follower-count')
const { channelId } = require('@gonetone/get-youtube-id-by-url')

function Services() {
    const SELF = {
        BASE_EMAIL_INS: "ndhieuvegia983@gmail.com",
        BASE_PASSWORD_INS: "Hieu0976930983@",
        BASE_DOMAIN_TWI: "https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=",
        BASE_DOMAIN_YTB: "https://www.googleapis.com/youtube/v3/channels?part=statistics&",
        API_KEY: "AIzaSyCrHTFjvU0x7CBwzPCw-_S-2i2whd99nwo"
    };
    return {
        /**Get follows count from instagram */
        runInstagram: async (req, res) => {
            try {
                let username = req.body.username;
                let count = await getFollows.getFollowerCount({
                    type: 'instagram',
                    username: username,
                    sessionId: await getFollows.getIgSessionId(SELF.BASE_EMAIL_INS,SELF.BASE_PASSWORD_INS)
                })
                res.send({
                    status: "Success",
                    data: {
                        followsCount: count
                    }
                })
            } catch (err) {
                res.send({
                    status: "Fail",
                    message: err
                })
            }
        },
        /**Get follows count from Youtube */
        runYoutube: async (req, res) => {
            try {
                let uri = req.body.uri;
                let channel_id
                await channelId(uri).then((id) => {
                    if(id) {
                        channel_id = id
                    }
                })
                const channelInfo = await axios({
                    method: 'get',
                    url: `${SELF.BASE_DOMAIN_YTB}id=${channel_id}&key=${SELF.API_KEY}`
                })
                let statisticsData = channelInfo.data.items[0].statistics;
                let count = statisticsData.subscriberCount;
                if(count >= 0) {
                    res.send({
                        status: "Success",
                        data: {
                            followsCount: count
                        }
                    })
                }
            } catch (err) {
                res.send({
                    status: "Fail",
                    message: err
                })
            }
        },
        /**Get follows count from Twitter */
        runTwitter: async (req, res) => {
            try {
                let username = req.body.username
                const userInfo = await axios({
                    method: 'get',
                    url: `${SELF.BASE_DOMAIN_TWI}${username}`
                })

                let followsCount = userInfo.data[0].followers_count; 
                res.send({
                    status: "Success",
                    data: {
                        followsCount: followsCount
                    }
                })
            } catch (err) {
                res.send({
                    status: "Fail",
                    message: err
                })
            }
        },
        /**Get follows count from Tiktok */
        runTiktok: async (req, res) => {
            try {
                let username = req.body.username
                let count = await getFollows.getFollowerCount({
                    type: 'tiktok',
                    username: username
                })
                res.send({
                    status: "Success",
                    data: {
                        followsCount: count
                    }
                })
            } catch (err) {
                res.send({
                    status: "Fail",
                    message: err
                })
            }
        }
    }
}

//Commit 2

module.exports = new Services();



