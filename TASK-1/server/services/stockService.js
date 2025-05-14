const axios = require('axios');

const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3MjA5ODg5LCJpYXQiOjE3NDcyMDk1ODksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjdlYTA5MWYyLTUwNDMtNDhmOC1hOGY4LWY1NjJmM2M5MzIyMiIsInN1YiI6InNhY2hpbjIwMDQxNjRAZ21haWwuY29tIn0sImVtYWlsIjoic2FjaGluMjAwNDE2NEBnbWFpbC5jb20iLCJuYW1lIjoiYSBzYWNoaW4iLCJyb2xsTm8iOiJlbmcyMmNzMDAwMiIsImFjY2Vzc0NvZGUiOiJDdnRQY1UiLCJjbGllbnRJRCI6IjdlYTA5MWYyLTUwNDMtNDhmOC1hOGY4LWY1NjJmM2M5MzIyMiIsImNsaWVudFNlY3JldCI6IlJNYm5URHZjQVl3a2J4UUYifQ.xv45asSAmUHlKzvMWPsDbqZohlSz2TYtYvtjyBcOCUo'

exports.fetchStockPrices = async (ticker, minutes) => {
  try {
    const response = await axios.get(
      `http://20.244.56.144/evaluation-service/stocks/${ticker}?minutes=${minutes}`,
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching stock prices:', error.message);
    return [];
  }
};
