'use client';
import { useState, useEffect } from 'react';
import StockChart from './components/StockChart';

export default function Home() {
  const [ticker, setTicker] = useState('RELIANCE.NS');
  const [period, setPeriod] = useState('1mo');
  const [predictDays, setPredictDays] = useState(7);
  const [historicalData, setHistoricalData] = useState(null);
  const [predictedData, setPredictedData] = useState(null);
  const [stats, setStats] = useState(null);

  const stocks = [
    { name: 'Reliance', ticker: 'RELIANCE.NS', color: 'bg-purple-600' },
    { name: 'Nifty 50', ticker: '^NSEI', color: 'bg-blue-600' },
    { name: 'TCS', ticker: 'TCS.NS', color: 'bg-indigo-600' },
    { name: 'Infosys', ticker: 'INFY.NS', color: 'bg-cyan-600' }
  ];

  useEffect(() => {
    fetchData();
  }, [ticker, period, predictDays]);

  const fetchData = async () => {
    try {
      const [hist, pred, st] = await Promise.all([
        fetch(`http://localhost:5000/api/stock/${ticker}?period=${period}`).then(r => r.json()),
        fetch(`http://localhost:5000/api/predict/${ticker}?days=${predictDays}`).then(r => r.json()),
        fetch(`http://localhost:5000/api/stats/${ticker}`).then(r => r.json())
      ]);
      setHistoricalData(hist);
      setPredictedData(pred);
      setStats(st);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getSignalColor = (signal) => {
    if (signal === 'Buy') return 'text-green-400';
    if (signal === 'Sell') return 'text-red-400';
    return 'text-yellow-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="backdrop-blur-sm bg-black/20">
        <nav className="border-b border-white/10 px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-3xl">📈</span> StockFlow
            </h1>
            <div className="flex gap-4">
              <button className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition">Portfolio</button>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition">Upgrade</button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-2">Market Overview</h2>
            <p className="text-gray-400">Track and predict stock performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {stocks.map(s => (
              <button
                key={s.ticker}
                onClick={() => setTicker(s.ticker)}
                className={`p-6 rounded-2xl backdrop-blur-md transition-all transform hover:scale-105 ${
                  ticker === s.ticker 
                    ? 'bg-gradient-to-br from-purple-600 to-blue-600 shadow-2xl shadow-purple-500/50' 
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                <div className="text-left">
                  <p className="text-sm text-gray-400 mb-1">{s.ticker}</p>
                  <p className="text-xl font-bold text-white">{s.name}</p>
                </div>
              </button>
            ))}
          </div>

          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-green-500/30">
                <p className="text-sm text-gray-300 mb-2">Current Price</p>
                <p className="text-3xl font-bold text-white">₹{stats.current.toFixed(2)}</p>
                <p className={`text-sm mt-1 ${stats.dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stats.dayChange >= 0 ? '▲' : '▼'} {Math.abs(stats.dayChange).toFixed(2)}% today
                </p>
              </div>
              <div className={`p-6 rounded-2xl backdrop-blur-md border ${
                stats.change >= 0 
                  ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30' 
                  : 'bg-gradient-to-br from-red-500/20 to-rose-500/20 border-red-500/30'
              }`}>
                <p className="text-sm text-gray-300 mb-2">Change</p>
                <p className={`text-3xl font-bold ${stats.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stats.change >= 0 ? '+' : ''}{stats.change.toFixed(2)}%
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md border border-blue-500/30">
                <p className="text-sm text-gray-300 mb-2">High</p>
                <p className="text-3xl font-bold text-white">₹{stats.high.toFixed(2)}</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-500/30">
                <p className="text-sm text-gray-300 mb-2">Low</p>
                <p className="text-3xl font-bold text-white">₹{stats.low.toFixed(2)}</p>
              </div>
            </div>
          )}

          <div className="flex gap-4 mb-8">
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="1wk" className="bg-gray-900">1 Week</option>
              <option value="1mo" className="bg-gray-900">1 Month</option>
              <option value="3mo" className="bg-gray-900">3 Months</option>
            </select>
            <select value={predictDays} onChange={(e) => setPredictDays(Number(e.target.value))} className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="7" className="bg-gray-900">Predict 1 Week</option>
              <option value="30" className="bg-gray-900">Predict 1 Month</option>
            </select>
          </div>

          {historicalData && predictedData && (
            <>
              <StockChart historical={historicalData} predicted={predictedData} ticker={ticker} />
              
              {predictedData.analysis && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10">
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-4">🤖</div>
                      <h3 className="text-2xl font-bold text-white">AI Brain Analysis</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{predictedData.analysis.trend === 'Bullish' ? '🚀' : '⚠️'}</span>
                            <div>
                              <div className="text-sm text-gray-400">Market Direction</div>
                              <div className={`text-2xl font-bold ${predictedData.analysis.trend === 'Bullish' ? 'text-green-400' : 'text-red-400'}`}>
                                {predictedData.analysis.trend === 'Bullish' ? 'Going Up!' : 'Going Down!'}
                              </div>
                            </div>
                          </div>
                          <div className="text-3xl font-bold text-white">{predictedData.analysis.strength.toFixed(0)}%</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">📊</span>
                          <div className="text-sm text-gray-400">Market Temperature</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="h-8 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full relative">
                              <div 
                                className="absolute top-0 w-2 h-8 bg-white rounded-full shadow-lg"
                                style={{ left: `${predictedData.analysis.rsi}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                              <span>Cold (Buy)</span>
                              <span>Hot (Sell)</span>
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-white">{predictedData.analysis.rsi.toFixed(0)}</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">⚡</span>
                            <div>
                              <div className="text-sm text-gray-400">Risk Level</div>
                              <div className="text-2xl font-bold text-white">
                                {predictedData.analysis.volatility < 2 ? 'Low Risk 😊' : 
                                 predictedData.analysis.volatility < 4 ? 'Medium Risk 😐' : 'High Risk 😰'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-md border border-purple-500/30">
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-4">💡</div>
                      <h3 className="text-2xl font-bold text-white">What Should You Do?</h3>
                    </div>
                    <div className="text-center">
                      <div className={`text-7xl font-bold mb-6 ${getSignalColor(predictedData.analysis.signal)}`}>
                        {predictedData.analysis.signal === 'Buy' && '🟢 BUY'}
                        {predictedData.analysis.signal === 'Sell' && '🔴 SELL'}
                        {predictedData.analysis.signal === 'Hold' && '🟡 WAIT'}
                      </div>
                      
                      <div className="mb-6">
                        <div className="text-lg text-gray-400 mb-3">AI Confidence</div>
                        <div className="relative">
                          <div className="w-full bg-gray-700 rounded-full h-6">
                            <div 
                              className={`h-6 rounded-full transition-all ${
                                predictedData.analysis.confidence > 70 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                predictedData.analysis.confidence > 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                'bg-gradient-to-r from-red-500 to-rose-500'
                              }`}
                              style={{ width: `${predictedData.analysis.confidence}%` }}
                            ></div>
                          </div>
                          <div className="text-4xl font-bold text-white mt-3">{predictedData.analysis.confidence.toFixed(0)}%</div>
                        </div>
                      </div>
                      
                      <div className="p-6 rounded-2xl bg-black/30 border border-white/10">
                        <div className="text-2xl mb-2">
                          {predictedData.analysis.signal === 'Buy' && '✅'}
                          {predictedData.analysis.signal === 'Sell' && '⛔'}
                          {predictedData.analysis.signal === 'Hold' && '⏸️'}
                        </div>
                        <p className="text-lg text-gray-300">
                          {predictedData.analysis.signal === 'Buy' && 'Good time to buy! Price is low and may go up.'}
                          {predictedData.analysis.signal === 'Sell' && 'Consider selling! Price is high and may go down.'}
                          {predictedData.analysis.signal === 'Hold' && 'Wait and watch! Not the best time to buy or sell.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
