import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime, timedelta

class StockAnalyzer:
    def __init__(self):
        self.stocks_data = {}
    
    def fetch_data(self, ticker, period="1y"):
        """Fetch historical stock data"""
        stock = yf.Ticker(ticker)
        df = stock.history(period=period)
        self.stocks_data[ticker] = df
        return df
    
    def compare_stocks(self, tickers, period="1y"):
        """Compare multiple stocks"""
        for ticker in tickers:
            self.fetch_data(ticker, period)
        
        plt.figure(figsize=(14, 7))
        for ticker, data in self.stocks_data.items():
            normalized = (data['Close'] / data['Close'].iloc[0]) * 100
            plt.plot(normalized.index, normalized, label=ticker, linewidth=2)
        
        plt.title('Stock Comparison (Normalized to 100)', fontsize=16)
        plt.xlabel('Date', fontsize=12)
        plt.ylabel('Normalized Price', fontsize=12)
        plt.legend()
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        plt.show()
    
    def plot_stock(self, ticker, period="1y"):
        """Plot individual stock with moving averages"""
        if ticker not in self.stocks_data:
            self.fetch_data(ticker, period)
        
        data = self.stocks_data[ticker]
        
        fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(14, 10))
        
        ax1.plot(data.index, data['Close'], label='Close Price', linewidth=2)
        ax1.plot(data.index, data['Close'].rolling(20).mean(), label='20-day MA', alpha=0.7)
        ax1.plot(data.index, data['Close'].rolling(50).mean(), label='50-day MA', alpha=0.7)
        ax1.set_title(f'{ticker} - Price & Moving Averages', fontsize=16)
        ax1.set_ylabel('Price', fontsize=12)
        ax1.legend()
        ax1.grid(True, alpha=0.3)
        
        ax2.bar(data.index, data['Volume'], alpha=0.5)
        ax2.set_title(f'{ticker} - Volume', fontsize=16)
        ax2.set_xlabel('Date', fontsize=12)
        ax2.set_ylabel('Volume', fontsize=12)
        ax2.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.show()
    
    def predict_trend(self, ticker, days=30):
        """Simple trend prediction using moving average"""
        if ticker not in self.stocks_data:
            self.fetch_data(ticker)
        
        data = self.stocks_data[ticker]
        last_price = data['Close'].iloc[-1]
        ma_20 = data['Close'].rolling(20).mean().iloc[-1]
        ma_50 = data['Close'].rolling(50).mean().iloc[-1]
        
        trend = (ma_20 - ma_50) / ma_50 * 100
        future_dates = pd.date_range(data.index[-1], periods=days+1, freq='D')[1:]
        predicted_prices = [last_price * (1 + trend/100/days) ** i for i in range(1, days+1)]
        
        plt.figure(figsize=(14, 7))
        plt.plot(data.index[-60:], data['Close'].iloc[-60:], label='Historical', linewidth=2)
        plt.plot(future_dates, predicted_prices, label='Predicted Trend', linestyle='--', linewidth=2)
        plt.axvline(x=data.index[-1], color='r', linestyle=':', alpha=0.5)
        plt.title(f'{ticker} - Historical & Predicted Trend', fontsize=16)
        plt.xlabel('Date', fontsize=12)
        plt.ylabel('Price', fontsize=12)
        plt.legend()
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        plt.show()
        
        return predicted_prices[-1]
    
    def get_stats(self, ticker):
        """Get stock statistics"""
        if ticker not in self.stocks_data:
            self.fetch_data(ticker)
        
        data = self.stocks_data[ticker]
        stats = {
            'Current Price': data['Close'].iloc[-1],
            'High (Period)': data['Close'].max(),
            'Low (Period)': data['Close'].min(),
            'Average': data['Close'].mean(),
            'Volatility (Std)': data['Close'].std(),
            'Total Return %': ((data['Close'].iloc[-1] - data['Close'].iloc[0]) / data['Close'].iloc[0] * 100)
        }
        return stats

if __name__ == "__main__":
    analyzer = StockAnalyzer()
    
    # Indian stocks: Reliance and Nifty
    reliance = "RELIANCE.NS"
    nifty = "^NSEI"
    tcs = "TCS.NS"
    
    print("Fetching stock data...")
    
    # Compare stocks
    analyzer.compare_stocks([reliance, nifty, tcs], period="1y")
    
    # Plot individual stock
    analyzer.plot_stock(reliance, period="1y")
    
    # Predict trend
    predicted = analyzer.predict_trend(reliance, days=30)
    print(f"\nPredicted price after 30 days: ₹{predicted:.2f}")
    
    # Get statistics
    stats = analyzer.get_stats(reliance)
    print(f"\n{reliance} Statistics:")
    for key, value in stats.items():
        print(f"{key}: {value:.2f}")
