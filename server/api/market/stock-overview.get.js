import { getMarketOverview } from '../../services/twelve-data.js'

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

export default defineEventHandler(async (event) => {
  const { twelveDataApiKey } = useRuntimeConfig(event);

  try {
    return await getMarketOverview({ twelveDataApiKey, symbol: STOCK_SYMBOLS_GROUP_1 })
  } catch (error) {
    console.error('Twelve Data error:', error.data || error.message)
    throw error
  }
})
