import { getAssetHistory } from '../../services/twelve-data.js'

export default defineEventHandler(async (event) => {
  const { twelveDataApiKey } = useRuntimeConfig(event);
  const { symbol } = getQuery(event);


  try {
    return await getAssetHistory({
      twelveDataApiKey,
      symbol: symbol,
      params: {
        interval: '5min',
        outputsize: 78,
      }
    });
  } catch (error) {
    console.error('Twelve Data error:', error.data || error.message)
    throw error
  }
})
