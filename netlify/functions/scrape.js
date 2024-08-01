const axios = require('axios');

exports.handler = async function(event, context) {
  const page = event.queryStringParameters.page || '0'; // Extract page parameter from the query string

  try {
    const url = `https://www.google.com/search?vet=10ahUKEwjOrdaa_-KGAxUd1gIHHVVnAZUQ06ACCJsO..i&ei=tltwZqDxGabgxc8Piuy3-AU&opi=89978449&rlz=1C1EJFC&yv=3&rciv=jb&nfpr=0&q=jobs&start=${page}0&asearch=jb_list&cs=1&async=_id:VoQFxe,_pms:hts,_fmt:pc`;
    const response = await axios.get(url);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ data: response.data })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

