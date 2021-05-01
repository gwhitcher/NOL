/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
/* eslint-disable indent */
class News {
    load(message) {
        const { prefix, newsapi, newsapi_results_count, newsapi_topnews_count } = require('../config.json');
        const https = require('https');

        // if bot exit
        if (message.author.bot) return;

        // google news search
        if (message.content.startsWith(prefix + 'gnews')) {
            const searchQuery = message.content.replace(prefix + 'gnews ', '');
            if (searchQuery.startsWith('!gnews')) {
                message.channel.send('Please enter a search query');
            } else { 
                const args = searchQuery.split(' ');
                
                let domains = '';
                if(args[1] !== undefined) {
                    domains = '&domains=' + args[1];
                }

                const url = 'https://newsapi.org/v2/everything?q=' + args[0] + domains + '&pageSize=' + newsapi_results_count + '&sortBy=popularity&apiKey=' + newsapi;
                https.get(url, res => {
                    res.setEncoding('utf8');
                    let body = '';
                    res.on('data', data => {
                        body += data;
                    });
                    res.on('end', () => {
                        body = JSON.parse(body);
                        //console.log(body);
                        for (let i = 0; i < body.articles.length; i++) {
                            let title = body.articles[i].title + '\n';
                            let description = body.articles[i].description + '\n';
                            let url = body.articles[i].url;
                            message.reply(title + description + url);
                        }
                    });
                });
            }
        }

        // google news top search
        if (message.content.startsWith(prefix + 'gtopnews')) {
            const searchQuery = message.content.replace(prefix + 'gtopnews ', '');
            if (searchQuery.startsWith('!gtopnews')) {
                message.channel.send('Please enter a search query');
            } else {
                const url = 'https://newsapi.org/v2/top-headlines?q=' + searchQuery + '&pageSize=' + newsapi_count + '&apiKey=' + newsapi_results_count;
                https.get(url, res => {
                    res.setEncoding('utf8');
                    let body = '';
                    res.on('data', data => {
                        body += data;
                    });
                    res.on('end', () => {
                        body = JSON.parse(body);
                        //console.log(body);
                        for (let i = 0; i < body.articles.length; i++) {
                            let title = body.articles[i].title + '\n';
                            let description = body.articles[i].description + '\n';
                            let url = body.articles[i].url;
                            message.reply(title + description + url);
                        }
                    });
                });
            }
        }

        // google news todays top news
        if (message.content.startsWith(prefix + 'todaysnews')) {
            const url = 'https://newsapi.org/v2/top-headlines?country=us&pageSize=' + newsapi_topnews_count + '&apiKey=' + newsapi;
            https.get(url, res => {
                res.setEncoding('utf8');
                let body = '';
                res.on('data', data => {
                    body += data;
                });
                res.on('end', () => {
                    body = JSON.parse(body);
                    //console.log(body);
                    for (let i = 0; i < body.articles.length; i++) {
                        let title = body.articles[i].title + '\n';
                        let description = body.articles[i].description + '\n';
                        let url = body.articles[i].url;
                        message.reply(title + description + url);
                    }
                });
            });
        }

        // google news todays news from source
        if (message.content.startsWith(prefix + 'snews')) {
            const searchQuery = message.content.replace(prefix + 'snews ', '');
            if (searchQuery.startsWith('!snews')) {
                message.channel.send('Please enter a source');
            } else {
                const url = 'https://newsapi.org/v2/top-headlines?sources=' + searchQuery + '&pageSize=' + newsapi_topnews_count + '&apiKey=' + newsapi;
                https.get(url, res => {
                    res.setEncoding('utf8');
                    let body = '';
                    res.on('data', data => {
                        body += data;
                    });
                    res.on('end', () => {
                        body = JSON.parse(body);
                        //console.log(body);
                        for (let i = 0; i < body.articles.length; i++) {
                            let title = body.articles[i].title + '\n';
                            let description = body.articles[i].description + '\n';
                            let url = body.articles[i].url;
                            message.reply(title + description + url);
                        }
                    });
                });
            }
        }
    }
}

module.exports = News;