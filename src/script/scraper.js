const pptr = require('puppeteer-core');
const jsonfile = require('jsonfile');

const getObjLen = (obj) => {
    if (!Object.keys) {
        let count = 0;
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                count++;
            }
        }
        return count;
    }
    return Object.keys(obj).length;
}

const loadPptr = async (headLess = true) => {
    const browser = await pptr.launch({
        executablePath: "C:\\Program Files\\Chromium\\chrome.exe",
        headless: headLess,
        defaultViewport: null,
        args: ['--start-maximized']
    })

    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    return [browser, page];
}

async function scrollDown(page, selector) {
    await page.$eval(selector, e => {
      e.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
    });
}

async function getCount(page, selector) {
    return await page.$$eval(selector, x => x.length);
}

const genMovies = async (page, count, delay, btnSelector, movieSelector, bottomSelector) => {
    try{
        let preCount = 0;
        await page.waitForSelector(btnSelector);
        await page.click(btnSelector);//Click The Button
    
        await page.waitForTimeout(delay + 1000);

        while(preCount < count){
            console.log('Loop Started');
            await scrollDown(page, bottomSelector);//Scroll Down
            await page.waitForTimeout(delay);
            preCount = await getCount(page, movieSelector);
        }
    }catch(err){
        console.log(err.message);
    }
}

const scrapTM = async (url, postCount) => {
    try{
        const [browser, page] = await loadPptr(false);
        await page.goto(url);
        await page.screenshot({path:'preview.png'});

        //Greater The Delay, The Less Loops Will Run, Increase In Performance
        await genMovies(page, postCount, 3000 ,'#pagination_page_1 > p > a',  '#media_results > div > .page_wrapper > .card.style_1', 'body > footer > nav');
        console.log('Generated Movies');

        let movieCards = await page.$$eval('#media_results > div > .page_wrapper > .card.style_1', (el) => {
            return el.map((x, i) => {
                
                const imgEl = x.querySelector('a.image > img');//.src
                const titleEl = x.querySelector('.content > h2 > a');//.textContent
                const dateEl = x.querySelector('.content > p');//.textContent
                const ratingEl = x.querySelector('.user_score_chart');//.data-percent
                const linkEl = x.querySelector('a.image');//.href
                
                const data = new Object();

                if(titleEl){
                     data.title = titleEl.textContent;
                }

                if(imgEl){
                    data.imgSrc = imgEl.src;
                }

                if(linkEl){
                    data.link = linkEl.href;
                }

                if(dateEl){
                    data.date = dateEl.textContent;
                }

                if(ratingEl){
                    data.rating = ratingEl.dataset.percent;
                }

                return data;
            })
        });

        console.log('Scraped Movies: ' + movieCards.length);

        //Filter Out Empty Objects
        movieCards = movieCards.filter((el) => (getObjLen(el) > 0));

        console.log('Useful Movies: ' + movieCards.length);

        //await page.screenshot({path: 'preview.png', fullPage: true});

        jsonfile.writeFile('movieData.json', movieCards, (err) => {
            if(!err){
                console.log('Data Saved Succesfully');
            }
        });
        
        console.log('done');
        
        await browser.close();

    }catch(err){
        console.log('Something went wrong', err.message);
    }
}

scrapTM('https://www.themoviedb.org/movie', 200);

/*
to browse everything
https://www.themoviedb.org/movie
*/