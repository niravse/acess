const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async function(event, context) {
  const page = event.queryStringParameters.page || '0'; // Extract page parameter from the query string

  try {
    const url = `https://www.google.com/search?vet=10ahUKEwitmdOphOOGAxUy1gIHHV9qA2MQ06ACCOkM..i&ei=FGFwZrqbA7CL7NYPh5W98Ao&opi=89978449&rlz=1C1EJFC&yv=3&rciv=jb&nfpr=0&q=jobs&start=${page}0&asearch=jb_list&cs=1&async=_id:VoQFxe,_pms:hts,_fmt:pc`;
    const response = await axios.get(url,{
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ data:response.data })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

