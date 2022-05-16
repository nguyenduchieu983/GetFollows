const axios = require('axios')
const cheerio = require('cheerio');
const request = require('request-promise');
const DOMParser = require('xmldom').DOMParser;

/**Get follows count from instagram */
const runInstagram = async () => {
    try {
        const post = await axios({
            method: 'get',
            url: 'https://www.instagram.com/dang_duy_deb'
        })

        const pattern = /<script type="text\/javascript">window._sharedData = ([\s\S]*?);<\/script>/gi
        const matches = pattern.exec(post.data)
        const scriptContent = matches[1]
        const json = JSON.parse(scriptContent)
    
        if (json.entry_data.LoginAndSignupPage) throw new Error('Login required')

        let userInfo = json.entry_data.ProfilePage[0].graphql.user

        let followsCount = userInfo.edge_followed_by['count']
        console.log(followsCount);
           
        } catch (err) {
            console.log(err)
        }``
}

/**Get follows count from Tiktok */
const runTiktok = async () => {
    try {
        const post = await axios({
            method: 'get',
            url: 'https://twitter.com/goal'
        })
        
        const docHTML = new DOMParser().parseFromString(post.data, "text/xml");
        console.log(docHTML.getElementsByClassName("css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0"))
           
    } catch (err) {
        console.log(err)
    }``
}

runTiktok()