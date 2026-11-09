import { getStockNews } from '../../services/finnhub.js'

// Example http://localhost:3000/api/news/stock-news?symbol=AAPL&from=2026-11-08&to=2026-11-09
export default defineEventHandler(async (event) => {
  const { finnhubApiKey } = useRuntimeConfig(event)
  const { symbol, from, to } = getQuery(event)

  if (!symbol || !from || !to) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required parameters: symbol, from, to'
    })
  }

  try {
    return await getStockNews({
      finnhubApiKey,
      symbol,
      from,
      to
    })
  } catch (error) {
    console.error('Finnhub error:', error.data || error.message)
    throw error
  }
})