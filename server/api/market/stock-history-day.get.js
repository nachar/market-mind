import { getAssetHistory } from '../../services/twelve-data.js'
import { saveAssetHistory } from '../../services/asset-price-history.js'

export default defineEventHandler(async (event) => {
  const { twelveDataApiKey } = useRuntimeConfig(event)
  const { symbol } = getQuery(event)

  if (!symbol || typeof symbol !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'A valid symbol is required'
    })
  }

  try {
    const data = await getAssetHistory({
      twelveDataApiKey,
      symbol,
      params: {
        interval: '5min',
        outputsize: 78
      }
    })

    if (data.status !== 'ok' || !data.meta || !Array.isArray(data.values)) {
      throw new Error('Invalid response from Twelve Data')
    }

    const saved = await saveAssetHistory(data)

    return {
      success: true,
      symbol: data.meta.symbol,
      interval: data.meta.interval,
      received: data.values.length,
      saved
    }
  } catch (error) {
    console.error('Stock history error:', error.data || error.message)

    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to retrieve or save stock history',
      cause: error
    })
  }
})