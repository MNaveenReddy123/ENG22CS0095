exports.calculateCorrelation = (prices1, prices2) => {
  const length = Math.min(prices1.length, prices2.length);
  const x = prices1.slice(0, length).map(p => p.price);
  const y = prices2.slice(0, length).map(p => p.price);

  const meanX = x.reduce((sum, val) => sum + val, 0) / length;
  const meanY = y.reduce((sum, val) => sum + val, 0) / length;

  const numerator = x.reduce((sum, val, i) => sum + (val - meanX) * (y[i] - meanY), 0);
  const denominatorX = Math.sqrt(x.reduce((sum, val) => sum + Math.pow(val - meanX, 2), 0));
  const denominatorY = Math.sqrt(y.reduce((sum, val) => sum + Math.pow(val - meanY, 2), 0));

  const denominator = denominatorX * denominatorY;

  return denominator === 0 ? 0 : numerator / denominator;
};
