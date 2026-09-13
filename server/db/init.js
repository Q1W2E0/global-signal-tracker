const db = require('./database');

db.init();

// 初始化20指标面板
const indicators = [
  // 资本流面板
  { name: 'DXY - US Dollar Index', category: 'Capital Flow', unit: 'Index' },
  { name: '10Y US Treasury Yield', category: 'Capital Flow', unit: '%' },
  { name: 'Gold Price', category: 'Capital Flow', unit: 'USD/oz' },
  { name: 'China-US Interest Rate Spread', category: 'Capital Flow', unit: '%' },
  { name: 'Offshore CNY Exchange Rate', category: 'Capital Flow', unit: 'CNY/USD' },
  
  // 商品与能量流面板
  { name: 'Brent Crude Oil', category: 'Commodity & Energy', unit: 'USD/barrel' },
  { name: 'BDI - Baltic Dry Index', category: 'Commodity & Energy', unit: 'Index' },
  { name: 'Lithium Price', category: 'Commodity & Energy', unit: 'USD/ton' },
  { name: 'Grain Price Index', category: 'Commodity & Energy', unit: 'Index' },
  
  // 军事与政治流面板
  { name: 'Maritime Insurance Rate', category: 'Geopolitics', unit: '%' },
  { name: 'Defense Budget Trend', category: 'Geopolitics', unit: 'Index' },
  { name: 'Sanctions List Updates', category: 'Geopolitics', unit: 'Count' },
  { name: 'Diplomatic Events', category: 'Geopolitics', unit: 'Index' },
  
  // 技术与社会流面板
  { name: 'AI Model Iteration Speed', category: 'Technology & Society', unit: 'Index' },
  { name: 'Global Birth Rate', category: 'Technology & Society', unit: '%' },
  { name: 'Global Migration Data', category: 'Technology & Society', unit: 'Index' },
  { name: 'Tech Capex (Data Centers)', category: 'Technology & Society', unit: 'Billion USD' },
  
  // 系统性预警面板
  { name: 'JPY Exchange Rate', category: 'System Warning', unit: 'JPY/USD' },
  { name: 'Regional Banking Credit Events', category: 'System Warning', unit: 'Count' },
  { name: 'Critical Strait Risk Index', category: 'System Warning', unit: 'Index' }
];

indicators.forEach(ind => {
  db.run(
    `INSERT OR IGNORE INTO indicators (name, category, unit) VALUES (?, ?, ?)`,
    [ind.name, ind.category, ind.unit]
  );
});

console.log('✅ Indicators seeded');
