'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function StockChart({ historical, predicted, ticker }) {
  const chartData = [
    ...historical.dates.map((date, i) => ({
      date: date.slice(5),
      price: historical.prices[i],
      type: 'historical'
    })),
    ...predicted.dates.map((date, i) => ({
      date: date.slice(5),
      predicted: predicted.prices[i],
      type: 'predicted'
    }))
  ];

  const lastHistorical = historical.prices[historical.prices.length - 1];
  const lastPredicted = predicted.prices[predicted.prices.length - 1];
  const priceChange = lastPredicted - lastHistorical;
  const percentChange = (priceChange / lastHistorical * 100).toFixed(2);
  const isGoingUp = priceChange > 0;

  return (
    <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10">
      {/* Simple Visual Indicator */}
      <div className="mb-8 text-center">
        <div className="text-8xl mb-4">
          {isGoingUp ? '📈' : '📉'}
        </div>
        <div className={`text-5xl font-bold mb-2 ${isGoingUp ? 'text-green-400' : 'text-red-400'}`}>
          {isGoingUp ? '↑ GOING UP' : '↓ GOING DOWN'}
        </div>
        <div className="text-2xl text-gray-300 mb-4">
          Price will {isGoingUp ? 'increase' : 'decrease'} by <span className="font-bold">{Math.abs(percentChange)}%</span>
        </div>
        <div className="flex justify-center gap-8 text-xl">
          <div>
            <div className="text-gray-400">Today</div>
            <div className="text-3xl font-bold text-white">₹{lastHistorical.toFixed(2)}</div>
          </div>
          <div className="text-5xl text-gray-500">→</div>
          <div>
            <div className="text-gray-400">Predicted</div>
            <div className={`text-3xl font-bold ${isGoingUp ? 'text-green-400' : 'text-red-400'}`}>
              ₹{lastPredicted.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Color-coded zones */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-blue-500/20 border-2 border-blue-500">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <div className="text-sm text-gray-300">Past Data</div>
            <div className="text-lg font-bold text-blue-400">What Happened</div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-green-500/20 border-2 border-green-500">
          <div className="text-center">
            <div className="text-4xl mb-2">🔮</div>
            <div className="text-sm text-gray-300">AI Prediction</div>
            <div className="text-lg font-bold text-green-400">What Will Happen</div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={450}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF" 
            style={{ fontSize: '14px', fontWeight: 'bold' }} 
          />
          <YAxis 
            stroke="#9CA3AF" 
            style={{ fontSize: '14px', fontWeight: 'bold' }}
            label={{ value: 'Price (₹)', angle: -90, position: 'insideLeft', style: { fill: '#9CA3AF' } }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(17, 24, 39, 0.95)', 
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              fontSize: '16px',
              fontWeight: 'bold'
            }} 
            labelStyle={{ color: '#fff', fontSize: '14px' }}
            formatter={(value) => ['₹' + value.toFixed(2), '']}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#3b82f6" 
            strokeWidth={4} 
            fill="url(#colorPrice)" 
            name="Past" 
          />
          <Area 
            type="monotone" 
            dataKey="predicted" 
            stroke="#10b981" 
            strokeWidth={4} 
            strokeDasharray="8 8" 
            fill="url(#colorPredicted)" 
            name="Future" 
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Simple Legend */}
      <div className="flex justify-center gap-8 mt-6 text-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-1 bg-blue-500 rounded"></div>
          <span className="text-white font-bold">Past (Real Data)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-1 bg-green-500 rounded" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #10b981 0px, #10b981 8px, transparent 8px, transparent 16px)' }}></div>
          <span className="text-white font-bold">Future (AI Guess)</span>
        </div>
      </div>
    </div>
  );
}
