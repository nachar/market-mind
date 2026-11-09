import { getAssetHistory } from '../../services/twelve-data.js'

export default defineEventHandler(async (event) => {
  const { twelveDataApiKey } = useRuntimeConfig(event);
  const { symbol } = getQuery(event);


  try {
    return await getAssetHistory({
      twelveDataApiKey,
      symbol: symbol,
      params: {
        interval: '1day',
        outputsize: 365,
      }
    });
  } catch (error) {
    console.error('Twelve Data error:', error.data || error.message)
    throw error
  }
})
