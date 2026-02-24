# Stock Analyzer & Comparison Tool

Compare and analyze multiple stocks with historical data and trend predictions.

## Installation

```bash
pip install -r requirements.txt
```

## Usage

### Basic Usage
```python
from stock_analyzer import StockAnalyzer

analyzer = StockAnalyzer()

# Compare multiple stocks
analyzer.compare_stocks(['RELIANCE.NS', '^NSEI', 'TCS.NS'], period="1y")

# Plot individual stock
analyzer.plot_stock('RELIANCE.NS', period="6mo")

# Predict future trend
predicted_price = analyzer.predict_trend('RELIANCE.NS', days=30)

# Get statistics
stats = analyzer.get_stats('RELIANCE.NS')
```

### Stock Ticker Symbols

**Indian Stocks (NSE):**
- Reliance: `RELIANCE.NS`
- Nifty 50: `^NSEI`
- TCS: `TCS.NS`
- Infosys: `INFY.NS`
- HDFC Bank: `HDFCBANK.NS`

**US Stocks:**
- Apple: `AAPL`
- Microsoft: `MSFT`
- Google: `GOOGL`
- Tesla: `TSLA`

### Period Options
- `1d`, `5d`, `1mo`, `3mo`, `6mo`, `1y`, `2y`, `5y`, `max`

## Run Example

```bash
python stock_analyzer.py
```
