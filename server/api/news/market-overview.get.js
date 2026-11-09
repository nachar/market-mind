import { getMarketNews } from '#server/services/finnhub.js'

export default defineEventHandler(async (event) => {
  const { finnhubApiKey } = useRuntimeConfig(event)
  // Available categories: general, forex, crypto y merger
  const { category } = getQuery(event)

  try {
    return await getMarketNews({
      finnhubApiKey,
      category: category || 'general'
    })
  } catch (error) {
    console.error('Finnhub error:', error.data || error.message)
    throw error
  }
})