# Stock Market Prediction App

A full-stack application for stock analysis and prediction with Firebase authentication.

## Features

✅ **Authentication**
- Firebase Email/Password login & signup
- Protected routes and session management
- JWT token handling

✅ **Stock Analysis**
- Real-time stock data from Yahoo Finance
- Interactive charts with historical data
- AI-powered trend prediction
- Technical indicators (RSI, Moving Averages)
- Buy/Sell/Hold signals

✅ **Supported Stocks**
- Indian Stocks: RELIANCE.NS, TCS.NS, INFY.NS
- Market Index: ^NSEI (Nifty 50)

## Tech Stack

**Frontend:**
- Next.js 15.1.6
- React 19
- Tailwind CSS
- Firebase Authentication
- Recharts for data visualization

**Backend:**
- Python Flask
- yfinance for stock data
- scikit-learn for predictions
- pandas & numpy for data processing

## Quick Start

### 1. Clone Repository
```bash
git clone <repository-url>
cd stock-Market-Prediction
```

### 2. Backend Setup
```bash
pip install -r requirements.txt
python api.py
```

### 3. Frontend Setup
```bash
cd stock-frontend
npm install
npm run dev
```

### 4. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `invoice-app-36f12`
3. Enable Authentication → Email/Password
4. Add `localhost` to authorized domains

### 5. Access Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## Usage

### Authentication
1. Visit http://localhost:3000
2. Sign up with email/password
3. Login to access dashboard

### Stock Analysis
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

### API Endpoints

```bash
# Get stock data
GET /api/stock/RELIANCE.NS?period=1mo

# Get predictions
GET /api/predict/RELIANCE.NS?days=7

# Get statistics
GET /api/stats/RELIANCE.NS
```

### Period Options
- `1d`, `5d`, `1wk`, `1mo`, `3mo`, `6mo`, `1y`, `2y`, `5y`, `max`

## Project Structure

```
stock-Market-Prediction/
├── api.py                 # Flask backend
├── stock_analyzer.py      # Core analysis logic
├── requirements.txt       # Python dependencies
├── stock-frontend/        # Next.js frontend
│   ├── app/
│   │   ├── components/    # React components
│   │   ├── page.js       # Main dashboard
│   │   └── layout.js     # App layout
│   ├── lib/              # Firebase config
│   ├── contexts/         # Auth context
│   └── package.json      # Node dependencies
└── README.md
```

## Screenshots

### Dashboard
![Dashboard](https://github.com/user-attachments/assets/9d788242-edf8-4f2c-bd3e-4dfdaf37bc2b)

### Stock Analysis
![Analysis](https://github.com/user-attachments/assets/2a148cbd-e100-4cdd-8b3e-186e79305e23)

### Predictions
![Predictions](https://github.com/user-attachments/assets/35f4f278-a620-4dfe-8002-3effdcefb5bf)

## Environment Variables

Create `.env.local` in `stock-frontend/`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

## Troubleshooting

### Authentication Issues
- Ensure Email/Password is enabled in Firebase Console
- Check Firebase config in `lib/firebase.js`
- Clear browser cache and restart app

### API Issues
- Ensure backend is running on port 5000
- Check CORS settings in `api.py`
- Verify internet connection for stock data

### Build Issues
```bash
# Clear Next.js cache
rm -rf .next
npm run dev

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Open an issue on GitHub
- Check troubleshooting section
- Review Firebase setup guide
