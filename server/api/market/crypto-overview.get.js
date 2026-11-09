import { getMarketOverview } from '../../services/twelve-data.js'

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

export default defineEventHandler(async (event) => {
  const { twelveDataApiKey } = useRuntimeConfig(event);

  try {
    return await getMarketOverview({ twelveDataApiKey, symbol: CRYPTO_SYMBOLS })
  } catch (error) {
    console.error('Twelve Data error:', error.data || error.message)
    throw error
  }
})
