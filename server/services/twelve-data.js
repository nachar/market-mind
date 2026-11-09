import { BASE_URL } from "#server/constants/api.js";

export const getMarketOverview = ({ twelveDataApiKey, symbol }) => {
  return $fetch(`${BASE_URL}/quote`, {
    query: {
      symbol: symbol.join(','),
      apikey: twelveDataApiKey
    }
  })
};

export const getAssetHistory = ({ twelveDataApiKey, symbol, params }) => {
  return $fetch(`${BASE_URL}/time_series`, {
    query: {
      symbol,
      apikey: twelveDataApiKey,
      ...params
      // interval: '1day' || '5min',
      // outputsize: 365 || 78,
    }
  })
}