const { fetchStockPrices } = require('../services/stockService');
const { calculateCorrelation } = require('../utils/correlation');

exports.getCorrelation = async (req, res) => {
  const { minutes, ticker: tickers } = req.query;

  if (!minutes || !tickers || tickers.length !== 2) {
    return res.status(400).json({ error: 'Invalid query parameters' });
  }

  const [ticker1, ticker2] = tickers;

  try {
    const [prices1, prices2] = await Promise.all([
      fetchStockPrices(ticker1, minutes),
      fetchStockPrices(ticker2, minutes),
    ]);

    if (!prices1.length || !prices2.length) {
      return res.status(404).json({ error: 'Insufficient data for correlation' });
    }

    const correlation = calculateCorrelation(prices1, prices2);

    const averagePrice1 =
      prices1.reduce((sum, p) => sum + p.price, 0) / prices1.length;
    const averagePrice2 =
      prices2.reduce((sum, p) => sum + p.price, 0) / prices2.length;

    res.json({
      correlation,
      stocks: {
        [ticker1]: {
          averagePrice: averagePrice1,
          priceHistory: prices1,
        },
        [ticker2]: {
          averagePrice: averagePrice2,
          priceHistory: prices2,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
