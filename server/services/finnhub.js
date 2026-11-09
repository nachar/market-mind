import { FINNHUB_BASE_URL } from '#server/constants/api.js'

export const getMarketNews = ({ finnhubApiKey, category = 'general' }) => {
  return $fetch(`${FINNHUB_BASE_URL}/news`, {
    query: {
      category
    },
    headers: {
      'X-Finnhub-Token': finnhubApiKey
    }
  })
}

export const getStockNews = ({ finnhubApiKey, symbol, from, to }) => {
  return $fetch(`${FINNHUB_BASE_URL}/company-news`, {
    query: {
      symbol,
      from,
      to
    },
    headers: {
      'X-Finnhub-Token': finnhubApiKey
    }
  })
}