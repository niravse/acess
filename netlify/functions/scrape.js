const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async function (event, context) {
  try {
    const page = event.queryStringParameters.page || 0;
    const url = `https://www.google.com/search?gl=uk&hl=en&vet=10ahUKEwjOrdaa_-KGAxUd1gIHHVVnAZUQ06ACCJsO..i&ei=tltwZqDxGabgxc8Piuy3-AU&opi=89978449&rlz=1C1EJFC&yv=3&rciv=jb&nfpr=0&q=jobs&start=${page}0&asearch=jb_list&cs=1&async=_id:VoQFxe,_pms:hts,_fmt:pc`;

    const response = await axios.get(url,{
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'X-Real-IP': '203.0.113.195',
      }
    });
    const html = response.data;
    const $ = cheerio.load(html);
    let linksnum = 0;
    const numofLinks = [];

    $('a').each((index, element) => {
      if ($(element).hasClass('pMhGee Co68jc j0vryd')) {
        linksnum += 1;
      } else {
        if (linksnum !== 0) {
          numofLinks.push(linksnum);
        }
        linksnum = 0;
      }
    });

    // Capture the last set of links if the loop ends on them
    if (linksnum !== 0) {
      numofLinks.push(linksnum);
    }
    let currentnum = [];
    $('div.BjJfJf.PUpOsf').each((i, elem) => {
      currentnum.push($(elem).text().trim());
    });
    let titles = [];
    $('div.BjJfJf.PUpOsf').each((i, elem) => {
      titles.push($(elem).text().trim());
    });
    let jobElements = [];
    $('a.pMhGee.Co68jc.j0vryd').each((i, elem) => {
      jobElements.push($(elem).attr('href'));
    });
    let descriptions = [];
    $("span.HBvzbc").each((i, elem) => {
      descriptions.push($(elem).text().trim());
    });
    let tempLocation = [];
    $('div.tJ9zfc').each((i, elem) => {
      tempLocation.push($(elem).text().trim());
    });
    let companies = [];
    $('div.nJlQNd.sMzDkb').each((i, elem) => {
      companies.push($(elem).text().trim());
    });
    let data = [];
    $('div.ocResc.KKh3md').each((i, elem) => {
      data.push($(elem).text().trim());
    });
    let names = [];
    $('div.acCJ4b > div > span > div > span > a > div > div > span').each((i, elem) => {
      names.push($(elem).text().trim());
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        numofLinks,
        currentnum,
        titles,
        jobElements,
        descriptions,
        tempLocation,
        companies,
        data,
        names,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to scrape data' }),
    };
  }
};
