import { analyzeMarket } from '#server/services/finance-ai.js'

export default defineEventHandler(async (event) => {
  const { market_data, news = [] } = await readBody(event)

  if (!market_data || typeof market_data !== 'object' || Array.isArray(market_data)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'market_data must be an object'
    })
  }

  try {
    return await analyzeMarket({
      market_data,
      news
    })
  } catch (error) {
    console.error('Finance AI error:', error.data || error.message)

    throw createError({
      statusCode: 502,
      statusMessage: 'Finance AI service unavailable',
      cause: error
    })
  }
})