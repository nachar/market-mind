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

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    return await getMarketOverview(config)
  } catch (error) {
    console.error('Twelve Data error:', error.data || error.message)
    throw error
  }
})
