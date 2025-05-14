import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './StockPage.css'; // Import the CSS file

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StockPage() {
  const [ticker, setTicker] = useState('');
  const [minutes, setMinutes] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!ticker || !minutes) {
      setError('Please enter both ticker symbol and minutes');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.get(`http://localhost:5000/stocks/${ticker}?minutes=${minutes}&aggregation=average`);
      setData(res.data);
    } catch (err) {
      setError('Error fetching data. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data
  const chartData = {
    labels: data ? data.priceHistory.map(p => {
      // Format the time label for better readability
      const date = new Date(p.time);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }) : [],
    datasets: [
      {
        label: `${ticker} Price`,
        data: data ? data.priceHistory.map(p => p.price) : [],
        fill: false,
        backgroundColor: '#6b48ff',
        borderColor: '#6b48ff',
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: `Price Trend for ${ticker.toUpperCase()}`,
        font: {
          size: 18,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(25, 26, 47, 0.9)',
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        displayColors: false,
        callbacks: {
          title: function(tooltipItems) {
            return `Time: ${tooltipItems[0].label}`;
          },
          label: function(context) {
            return `Price: $${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Time',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          font: {
            size: 12,
          },
          maxRotation: 45,
          minRotation: 45,
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        title: {
          display: true,
          text: 'Price ($)',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          font: {
            size: 12,
          },
          callback: function(value) {
            return '$' + value.toFixed(2);
          }
        }
      }
    }
  };

  return (
    <div className="stock-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">📊</span>
          StockTracker Pro
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link active">Stock Dashboard</a>
          <a href="/correlation" className="nav-link">Correlation Heatmap</a>
          <a href="#" className="nav-link">Watchlist</a>
          <a href="#" className="nav-link">Settings</a>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="content-area">
        <h2 className="header">📈 Stock Price Analysis</h2>
        
        {/* Input Controls */}
        <div className="input-group">
          <input 
            className="input-field" 
            placeholder="Enter ticker symbol (e.g., AAPL)" 
            value={ticker} 
            onChange={e => setTicker(e.target.value.toUpperCase())} 
          />
          <input 
            className="input-field" 
            placeholder="Minutes to analyze" 
            type="number"
            value={minutes} 
            onChange={e => setMinutes(e.target.value)} 
          />
          <button 
            className="action-button"
            onClick={fetchData}
          >
            Get Price Data
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="loading-indicator">
            Loading data for {ticker}...
          </div>
        )}

        {/* Results Section */}
        {data && !loading && (
          <div className="result-section">
            {/* Stock Info Cards */}
            <div className="stock-info">
              <div className="info-card">
                <div className="info-label">Average Price</div>
                <div className="info-value">${data.averageStockPrice.toFixed(2)}</div>
              </div>
              {data.priceHistory.length > 0 && (
                <>
                  <div className="info-card">
                    <div className="info-label">Highest Price</div>
                    <div className="info-value">
                      ${Math.max(...data.priceHistory.map(p => p.price)).toFixed(2)}
                    </div>
                  </div>
                  <div className="info-card">
                    <div className="info-label">Lowest Price</div>
                    <div className="info-value">
                      ${Math.min(...data.priceHistory.map(p => p.price)).toFixed(2)}
                    </div>
                  </div>
                  <div className="info-card">
                    <div className="info-label">Data Points</div>
                    <div className="info-value">{data.priceHistory.length}</div>
                  </div>
                </>
              )}
            </div>
            
            {/* Chart Section */}
            <div className="chart-wrapper">
              {data.priceHistory.length > 0 ? (
                <Line data={chartData} options={chartOptions} />
              ) : (
                <div className="no-data">No price history data available for the selected period.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}