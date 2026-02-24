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

### Period Options
- `1d`, `5d`, `1mo`, `3mo`, `6mo`, `1y`, `2y`, `5y`, `max`

## Run Example

```bash
python stock_analyzer.py
```
<img width="1899" height="494" alt="Screenshot 2026-02-24 225229" src="https://github.com/user-attachments/assets/9d788242-edf8-4f2c-bd3e-4dfdaf37bc2b" />

<img width="1903" height="888" alt="Screenshot 2026-02-24 225258" src="https://github.com/user-attachments/assets/2a148cbd-e100-4cdd-8b3e-186e79305e23" />

<img width="1916" height="508" alt="Screenshot 2026-02-24 225329" src="https://github.com/user-attachments/assets/35f4f278-a620-4dfe-8002-3effdcefb5bf" />
