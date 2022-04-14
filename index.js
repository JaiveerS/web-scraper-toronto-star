const PORT = 8000

const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
const express = require('express')

const app = express()
const URL = 'https://www.thestar.com/'

app.get('/', function(req,res){
    axios(URL)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles =[]
    
            $('a', html).each(function() {
                const title = $(this).find('h3').text()
                const category = $(this).find('.c-mediacard-labels').text()
                const when = $(this).find('.c-mediacard-footer').text()
                const url = URL + $(this).attr('href')
    
                if(title.length != 0 && url.length != 0){
                    articles.push({
                        title,
                        category,
                        url,
                        when
                    })
                }
    
            })
            res.send(articles)
            // console.log(articles)
        }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))

