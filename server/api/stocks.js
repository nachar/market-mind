const BASE_URL = 'https://api.twelvedata.com';

const CRYPTO_SYMBOLS = [
  'BTC/USD',  // Bitcoin
  'SOL/USD',  // Solana
  'LINK/USD', // Chainlink
  'AAVE/USD', // Aave
  'LTC/USD',  // Litecoin
  'XRP/USD',  // XRP
  'DOGE/USD', // Dogecoin
  'UNI/USD'   // Uniswap
]

const ETF_SYMBOLS = [
  'VWCE', // Vanguard FTSE All-World UCITS ETF (Acc)
  'IWDA', // iShares Core MSCI World UCITS ETF (Acc)
  'SXR8'  // iShares Core S&P 500 UCITS ETF (Acc)
]

const STOCK_SYMBOLS_GROUP_1 = [
  'SAN',     // Banco Santander (BME)
  'BBVA',    // BBVA (BME)
  'SAP',     // SAP (XETRA)
  'MSFT',    // Microsoft (NASDAQ)
  'PFE',     // Pfizer (NYSE)
  'AXP',     // American Express (NYSE)
  'MELI',    // MercadoLibre (NASDAQ)
  'ACN',     // Accenture (NYSE)
]

const STOCK_SYMBOLS_GROUP_2 = [
  'SPOT',    // Spotify (NYSE)
  'AAPL',    // Apple (NASDAQ)
  'IBM',     // IBM (NYSE)
  'SHOP',    // Shopify (NASDAQ)
  'WMT',     // Walmart (NASDAQ)
  'KO',      // Coca-Cola (NYSE)
  'TEAM',    // Atlassian (NASDAQ)
]

const getLastYear = async (config) => {
  return await $fetch(`${BASE_URL}/time_series`, {
    query: {
      interval: '1day',
      symbol: 'IBM',
      outputsize: 365,
      apikey: config.twelveDataApiKey
    }
  })
}


const getLastDay = async (config) => {
  return await $fetch(`${BASE_URL}/time_series`, {
    query: {
      interval: '5min',
      symbol: 'IBM',
      date: 'today',
      apikey: config.twelveDataApiKey
    }
  })
}

const getMarketOverview = async (config) => {
  return await $fetch(`${BASE_URL}/quote`, {
    query: {
      symbol: STOCK_SYMBOLS_GROUP_2.join(','),
      apikey: config.twelveDataApiKey
    }
  })
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    return await getMarketOverview(config)
  } catch (error) {
    console.error('Twelve Data error:', error.data || error.message)
    throw error
  }
})
