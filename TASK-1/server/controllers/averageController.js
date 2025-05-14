const { fetchStockPrices } = require('../services/stockService');

exports.getAveragePrice = async (req, res) => {
  const { ticker } = req.params;
  const { minutes, aggregation } = req.query;

  if (!minutes || aggregation !== 'average') {
    return res.status(400).json({ error: 'Invalid query parameters' });
  }

  try {
    const prices = await fetchStockPrices(ticker, minutes);
    if (!prices.length) {
      return res.status(404).json({ error: 'No price data found' });
    }

    const average =
      prices.reduce((sum, p) => sum + p.price, 0) / prices.length;

    res.json({
      averageStockPrice: average,
      priceHistory: prices,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
