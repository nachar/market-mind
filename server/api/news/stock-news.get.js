import { getStockNews } from '../../services/finnhub.js'
import { saveStockNews } from '../../services/stock-news.js'

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
    const news = await getStockNews({
      finnhubApiKey,
      symbol,
      from,
      to
    })

    if (!Array.isArray(news)) {
      throw new Error('Invalid response from Finnhub')
    }

    const saved = await saveStockNews({
      symbol: symbol.toUpperCase(),
      from,
      to,
      news
    })

    return {
      success: true,
      symbol: symbol.toUpperCase(),
      from,
      to,
      received: news.length,
      saved
    }
  } catch (error) {
    console.error('Stock news error:', error.data || error.message)

    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to retrieve or save stock news',
      cause: error
    })
  }
})