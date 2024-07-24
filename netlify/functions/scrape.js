const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async function (event, context) {
  try {
    const page = event.queryStringParameters.page || 0;
    const url = `https://www.example.com/jobs?page=${page}`;

    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Scraping titles
    let titles = [];
    $('div.BjJfJf.PUpOsf').each((i, elem) => {
      titles.push($(elem).text().trim());
    });

    // Scraping job URLs
    let jobElements = [];
    $('a.result-card__full-card-link').each((i, elem) => {
      jobElements.push($(elem).attr('href').trim());
    });

    // Scraping descriptions
    let descriptions = [];
    $('.HBvzbc').each((i, elem) => {
      descriptions.push($(elem).text().trim());
    });

    // Scraping locations
    let locations = [];
    $('div.tJ9zfc').each((i, elem) => {
      locations.push($(elem).text().trim());
    });

    // Scraping companies
    let companies = [];
    $('div.nJlQNd.sMzDkb').each((i, elem) => {
      companies.push($(elem).text().trim());
    });

    // Scraping additional data
    let data = [];
    $('div.ocResc.KKh3md').each((i, elem) => {
      data.push($(elem).text().trim());
    });

    // Scraping names
    let names = [];
    $('div.acCJ4b > div > span > div > span > a > div > div > span').each((i, elem) => {
      names.push($(elem).text().trim());
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        titles,
        jobElements,
        descriptions,
        locations,
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