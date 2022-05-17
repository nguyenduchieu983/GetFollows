const axios = require('axios')
const cheerio = require('cheerio');
const requestPro = require('request-promise');
const DOMParser = require('xmldom').DOMParser;
const fetch = require('cross-fetch')

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
       /**URL: https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=tu_yetanh396 */
           
    } catch (err) {
        console.log(err)
    }``
}

/*Get follows count from facebook*/
const runFacebook = async () =>{
    try {
        const response = await fetch("https://m.facebook.com/quang.tranhuu.524?v=followers", {
                "headers": {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "accept-language": "en-US,en;q=0.9",
                    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "none",
                    "sec-fetch-user": "?1",
                    "upgrade-insecure-requests": "1",
                    "cookie": "sb=1h8fYrNXL5v8G-XrsUkhfkKA; datr=UycfYoKcvGxHOrFjSUpeOjY7; c_user=100021591863586; xs=21%3AarrriX9gvYrRdw%3A2%3A1646208854%3A-1%3A6238%3A%3AAcWVWskNcSE16TIWrx4TzNwv9HN4eGzVojQC9fyL3u1a; fr=04CmhSXorXJCa9zdd.AWU4wyclw6hR7eQdZgAPXaUVqSo.BigxkD.9E.AAA.0.0.BigxmM.AWWAJ_pDoD0; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1652759204077%2C%22lm3%22%3A%22u.100015691909404%22%2C%22v%22%3A1%7D; m_pixel_ratio=1; wd=863x937"
                },
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET"
                });
        console.log(response)
     } catch (err) {
         console.log(err)
     }``
}

runFacebook()