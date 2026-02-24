from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from sklearn.linear_model import LinearRegression

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({'status': 'API Running', 'endpoints': ['/api/stock/<ticker>', '/api/predict/<ticker>', '/api/stats/<ticker>']})

@app.route('/api/stock/<ticker>')
def get_stock_data(ticker):
    period = request.args.get('period', '1mo')
    stock = yf.Ticker(ticker)
    df = stock.history(period=period)
    
    data = {
        'dates': df.index.strftime('%Y-%m-%d').tolist(),
        'prices': df['Close'].tolist(),
        'volumes': df['Volume'].tolist()
    }
    return jsonify(data)

@app.route('/api/predict/<ticker>')
def predict_stock(ticker):
    days = int(request.args.get('days', 7))
    stock = yf.Ticker(ticker)
    df = stock.history(period='6mo')
    
    # Linear Regression for better prediction
    from sklearn.linear_model import LinearRegression
    import numpy as np
    
    # Prepare data
    df['Days'] = range(len(df))
    X = df[['Days']].values
    y = df['Close'].values
    
    # Train model
    model = LinearRegression()
    model.fit(X, y)
    
    # Predict future
    last_day = len(df)
    future_days = np.array([[last_day + i] for i in range(1, days + 1)])
    predicted_prices = model.predict(future_days)
    
    # Add volatility based on historical std
    volatility = df['Close'].pct_change().std()
    
    # Calculate moving averages for trend
    ma_20 = df['Close'].rolling(20).mean().iloc[-1]
    ma_50 = df['Close'].rolling(50).mean().iloc[-1]
    trend_direction = 'Bullish' if ma_20 > ma_50 else 'Bearish'
    trend_strength = abs((ma_20 - ma_50) / ma_50 * 100)
    
    # RSI calculation
    delta = df['Close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
    rs = gain / loss
    rsi = 100 - (100 / (1 + rs))
    current_rsi = rsi.iloc[-1]
    
    # Confidence score
    confidence = min(100, max(50, 100 - (volatility * 1000)))
    
    future_dates = pd.date_range(df.index[-1], periods=days+1, freq='D')[1:]
    
    return jsonify({
        'dates': future_dates.strftime('%Y-%m-%d').tolist(),
        'prices': predicted_prices.tolist(),
        'analysis': {
            'trend': trend_direction,
            'strength': round(trend_strength, 2),
            'rsi': round(current_rsi, 2),
            'volatility': round(volatility * 100, 2),
            'confidence': round(confidence, 2),
            'signal': 'Buy' if current_rsi < 30 else 'Sell' if current_rsi > 70 else 'Hold'
        }
    })

@app.route('/api/stats/<ticker>')
def get_stats(ticker):
    stock = yf.Ticker(ticker)
    df = stock.history(period='1mo')
    info = stock.info
    
    prev_close = df['Close'].iloc[-2] if len(df) > 1 else df['Close'].iloc[0]
    current = df['Close'].iloc[-1]
    day_change = ((current - prev_close) / prev_close * 100)
    
    return jsonify({
        'current': current,
        'change': ((df['Close'].iloc[-1] - df['Close'].iloc[0]) / df['Close'].iloc[0] * 100),
        'dayChange': day_change,
        'high': df['Close'].max(),
        'low': df['Close'].min(),
        'volume': int(df['Volume'].iloc[-1]),
        'name': info.get('longName', ticker)
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
