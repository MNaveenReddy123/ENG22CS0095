import React, { useState } from 'react';
import axios from 'axios';

export default function CorrelationPage() {
  const [ticker1, setTicker1] = useState('');
  const [ticker2, setTicker2] = useState('');
  const [minutes, setMinutes] = useState('');
  const [correlation, setCorrelation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
      color: '#333'
    },
    header: {
      background: 'linear-gradient(to right, #4a6bdf, #6a5acd)',
      padding: '20px 0',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    logoIcon: {
      width: '32px',
      height: '32px',
      marginRight: '12px',
      color: 'white'
    },
    logoText: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white'
    },
    nav: {
      display: 'flex',
      gap: '24px'
    },
    navLink: {
      color: 'rgba(255, 255, 255, 0.8)',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 0.2s ease'
    },
    navLinkActive: {
      color: 'white',
      borderBottom: '2px solid white',
      paddingBottom: '4px'
    },
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '30px 20px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)',
      overflow: 'hidden',
      marginBottom: '30px'
    },
    cardGrid: {
      display: 'flex',
      flexDirection: 'column'
    },
    cardSidebar: {
      padding: '30px',
      background: 'linear-gradient(135deg, #4a6bdf, #6a5acd)',
      color: 'white'
    },
    cardTitle: {
      fontSize: '22px',
      fontWeight: 'bold',
      marginBottom: '12px'
    },
    cardDescription: {
      marginBottom: '24px',
      opacity: '0.9',
      lineHeight: '1.5'
    },
    featureList: {
      marginTop: '30px'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px'
    },
    featureIcon: {
      height: '40px',
      width: '40px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '14px'
    },
    featureIconSvg: {
      width: '24px',
      height: '24px'
    },
    featureText: {
      lineHeight: '1.4'
    },
    featureTitle: {
      fontWeight: '600',
      marginBottom: '4px'
    },
    featureSubtitle: {
      fontSize: '14px',
      opacity: '0.8'
    },
    formArea: {
      padding: '30px'
    },
    inputGroup: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '16px',
      marginBottom: '24px'
    },
    formControl: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#555'
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
    },
    button: {
      backgroundColor: '#4a6bdf',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: '600',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    errorMessage: {
      color: '#e53e3e',
      backgroundColor: '#fed7d7',
      padding: '10px 15px',
      borderRadius: '6px',
      marginBottom: '20px'
    },
    loadingSpinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 0',
      color: '#718096'
    },
    resultSection: {
      marginTop: '30px'
    },
    correlationCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f9fafc',
      borderRadius: '10px',
      marginBottom: '30px',
      textAlign: 'center'
    },
    correlationValue: {
      fontSize: '42px',
      fontWeight: 'bold',
      margin: '10px 0'
    },
    correlationLabel: {
      fontSize: '14px',
      color: '#718096',
      margin: '5px 0'
    },
    stocksInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '30px'
    },
    stockCard: {
      flex: '1',
      backgroundColor: '#f9fafc',
      borderRadius: '10px',
      padding: '20px',
      margin: '0 10px',
      textAlign: 'center'
    },
    stockSymbol: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '5px'
    },
    stockPrice: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#4a6bdf',
      margin: '10px 0'
    },
    stockDetails: {
      fontSize: '14px',
      color: '#718096'
    },
    heatmapContainer: {
      marginTop: '30px'
    },
    heatmapTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center'
    },
    heatmap: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    heatmapRow: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center'
    },
    heatmapLabel: {
      width: '80px',
      height: '80px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      backgroundColor: '#edf2f7',
      margin: '2px'
    },
    heatmapCell: {
      width: '80px',
      height: '80px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      margin: '2px',
      transition: 'transform 0.2s ease',
      color: 'white'
    },
    legend: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px'
    },
    legendGradient: {
      width: '100%',
      maxWidth: '400px',
      height: '20px',
      background: 'linear-gradient(to right, #e53e3e, #edf2f7, #38a169)',
      borderRadius: '4px'
    },
    legendLabels: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      maxWidth: '400px',
      marginTop: '8px',
      fontSize: '14px',
      color: '#718096'
    },
    priceHistorySection: {
      marginTop: '40px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    priceHistoryTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '15px'
    },
    priceHistoryCard: {
      width: 'calc(50% - 15px)',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      marginBottom: '20px'
    },
    priceHistoryTable: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    priceHistoryRow: {
      borderBottom: '1px solid #edf2f7'
    },
    priceHistoryCell: {
      padding: '10px',
      fontSize: '14px'
    },
    priceHistoryTime: {
      color: '#718096'
    },
    priceHistoryPrice: {
      fontWeight: '500',
      textAlign: 'right'
    }
  };

  const fetchCorrelation = async () => {
    if (!ticker1 || !ticker2 || !minutes) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.get(`http://localhost:5000/stockcorrelation?minutes=${minutes}&ticker=${ticker1}&ticker=${ticker2}`);
      setCorrelation(res.data);
    } catch (err) {
      setError('Failed to fetch correlation data');
    } finally {
      setLoading(false);
    }
  };

  const getCorrelationLabel = (value) => {
    if (value === null) return '';
    if (value > 0.7) return 'Strong Positive';
    if (value > 0.3) return 'Moderate Positive';
    if (value > 0) return 'Weak Positive';
    if (value === 0) return 'No Correlation';
    if (value > -0.3) return 'Weak Negative';
    if (value > -0.7) return 'Moderate Negative';
    return 'Strong Negative';
  };

  const getCorrelationColor = (value) => {
    if (value === null) return '#718096';
    if (value > 0.7) return '#38a169';
    if (value > 0.3) return '#68d391';
    if (value > 0) return '#9ae6b4';
    if (value === 0) return '#edf2f7';
    if (value > -0.3) return '#feb2b2';
    if (value > -0.7) return '#fc8181';
    return '#e53e3e';
  };

  const createCorrelationMatrix = () => {
    if (!correlation) return [];
    
    return [
      [1, correlation.correlation],
      [correlation.correlation, 1]
    ];
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoContainer}>
            <svg style={styles.logoIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 16l4-4 4 4 4-4 4 4 4-4 4 4"/>
              <path d="M1 20l4-4 4 4 4-4 4 4 4-4 4 4"/>
              <path d="M1 12l4-4 4 4 4-4 4 4 4-4 4 4"/>
            </svg>
            <span style={styles.logoText}>StockSync</span>
          </div>
          <nav style={styles.nav}>
            <a href="#" style={styles.navLink}>Dashboard</a>
            <a href="#" style={{...styles.navLink, ...styles.navLinkActive}}>Correlations</a>
            <a href="#" style={styles.navLink}>Market View</a>
            <a href="#" style={styles.navLink}>Settings</a>
          </nav>
        </div>
      </header>

      <main style={styles.mainContent}>
        <div style={styles.card}>
          <div style={{...styles.cardGrid, '@media (min-width: 768px)': {flexDirection: 'row'}}}>
            <div style={{...styles.cardSidebar, '@media (min-width: 768px)': {width: '35%'}}}>
              <h2 style={styles.cardTitle}>Stock Correlation Analysis</h2>
              <p style={styles.cardDescription}>
                Discover relationships between different stocks by analyzing their price correlation over time. 
                This tool helps you identify potential trading opportunities and diversification strategies.
              </p>
              <div style={styles.featureList}>
                <div style={styles.featureItem}>
                  <div style={styles.featureIcon}>
                    <svg style={styles.featureIconSvg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div style={styles.featureText}>
                    <div style={styles.featureTitle}>Pattern Recognition</div>
                    <div style={styles.featureSubtitle}>Identify correlated movements</div>
                  </div>
                </div>
                <div style={styles.featureItem}>
                  <div style={styles.featureIcon}>
                    <svg style={styles.featureIconSvg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div style={styles.featureText}>
                    <div style={styles.featureTitle}>Portfolio Optimization</div>
                    <div style={styles.featureSubtitle}>Balance risk and return</div>
                  </div>
                </div>
                <div style={styles.featureItem}>
                  <div style={styles.featureIcon}>
                    <svg style={styles.featureIconSvg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div style={styles.featureText}>
                    <div style={styles.featureTitle}>Historical Analysis</div>
                    <div style={styles.featureSubtitle}>Learn from past relationships</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{...styles.formArea, '@media (min-width: 768px)': {width: '65%'}}}>
              <div style={styles.inputGroup}>
                <div style={styles.formControl}>
                  <label style={styles.label}>First Stock Ticker</label>
                  <input
                    type="text"
                    value={ticker1}
                    onChange={(e) => setTicker1(e.target.value.toUpperCase())}
                    placeholder="e.g. AAPL"
                    style={styles.input}
                  />
                </div>
                <div style={styles.formControl}>
                  <label style={styles.label}>Second Stock Ticker</label>
                  <input
                    type="text"
                    value={ticker2}
                    onChange={(e) => setTicker2(e.target.value.toUpperCase())}
                    placeholder="e.g. MSFT"
                    style={styles.input}
                  />
                </div>
                <div style={styles.formControl}>
                  <label style={styles.label}>Time Period (Minutes)</label>
                  <input
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    placeholder="e.g. 60"
                    style={styles.input}
                  />
                </div>
              </div>
              
              <button onClick={fetchCorrelation} style={styles.button}>
                Calculate Correlation
              </button>
              
              {error && <div style={styles.errorMessage}>{error}</div>}
              
              {loading && 
                <div style={styles.loadingSpinner}>
                  Calculating correlation...
                </div>
              }
              
              {correlation && !loading && (
                <div style={styles.resultSection}>
                  <div style={{
                    ...styles.correlationCard,
                    backgroundColor: `${getCorrelationColor(correlation.correlation)}1a`
                  }}>
                    <div style={styles.correlationLabel}>
                      Correlation between {ticker1} and {ticker2} over {minutes} minutes
                    </div>
                    <div style={{
                      ...styles.correlationValue,
                      color: getCorrelationColor(correlation.correlation)
                    }}>
                      {correlation.correlation.toFixed(2)}
                    </div>
                    <div style={styles.correlationLabel}>
                      {getCorrelationLabel(correlation.correlation)}
                    </div>
                  </div>
                  
                  <div style={styles.stocksInfo}>
                    <div style={styles.stockCard}>
                      <div style={styles.stockSymbol}>{ticker1}</div>
                      <div style={styles.stockPrice}>
                        ${correlation.stocks[ticker1]?.averagePrice.toFixed(2) || 'N/A'}
                      </div>
                      <div style={styles.stockDetails}>
                        Data points: {correlation.stocks[ticker1]?.priceHistory?.length || 0}
                      </div>
                    </div>
                    
                    <div style={styles.stockCard}>
                      <div style={styles.stockSymbol}>{ticker2}</div>
                      <div style={styles.stockPrice}>
                        ${correlation.stocks[ticker2]?.averagePrice.toFixed(2) || 'N/A'}
                      </div>
                      <div style={styles.stockDetails}>
                        Data points: {correlation.stocks[ticker2]?.priceHistory?.length || 0}
                      </div>
                    </div>
                  </div>
                  
                  <div style={styles.heatmapContainer}>
                    <h3 style={styles.heatmapTitle}>Correlation Heatmap</h3>
                    
                    <div style={styles.heatmap}>
                      <div style={styles.heatmapRow}>
                        <div style={styles.heatmapLabel}></div>
                        <div style={styles.heatmapLabel}>{ticker1}</div>
                        <div style={styles.heatmapLabel}>{ticker2}</div>
                      </div>
                      
                      {createCorrelationMatrix().map((row, rowIndex) => (
                        <div key={rowIndex} style={styles.heatmapRow}>
                          <div style={styles.heatmapLabel}>
                            {rowIndex === 0 ? ticker1 : ticker2}
                          </div>
                          
                          {row.map((value, colIndex) => (
                            <div 
                              key={colIndex}
                              style={{
                                ...styles.heatmapCell,
                                backgroundColor: getCorrelationColor(value),
                              }}
                            >
                              {value.toFixed(2)}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    
                    <div style={styles.legend}>
                      <div style={styles.legendGradient}></div>
                      <div style={styles.legendLabels}>
                        <span>-1.0</span>
                        <span>0.0</span>
                        <span>+1.0</span>
                      </div>
                    </div>
                  </div>
                  
                  {correlation.stocks[ticker1]?.priceHistory?.length > 0 && correlation.stocks[ticker2]?.priceHistory?.length > 0 && (
                    <div style={styles.priceHistorySection}>
                      <div style={styles.priceHistoryCard}>
                        <h3 style={styles.priceHistoryTitle}>{ticker1} Price History</h3>
                        <table style={styles.priceHistoryTable}>
                          <tbody>
                            {correlation.stocks[ticker1].priceHistory.map((point, index) => (
                              <tr key={index} style={styles.priceHistoryRow}>
                                <td style={{...styles.priceHistoryCell, ...styles.priceHistoryTime}}>
                                  {new Date(point.lastUpdatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </td>
                                <td style={{...styles.priceHistoryCell, ...styles.priceHistoryPrice}}>
                                  ${point.price.toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div style={styles.priceHistoryCard}>
                        <h3 style={styles.priceHistoryTitle}>{ticker2} Price History</h3>
                        <table style={styles.priceHistoryTable}>
                          <tbody>
                            {correlation.stocks[ticker2].priceHistory.map((point, index) => (
                              <tr key={index} style={styles.priceHistoryRow}>
                                <td style={{...styles.priceHistoryCell, ...styles.priceHistoryTime}}>
                                  {new Date(point.lastUpdatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </td>
                                <td style={{...styles.priceHistoryCell, ...styles.priceHistoryPrice}}>
                                  ${point.price.toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}