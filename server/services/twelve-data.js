import { BASE_URL } from "#server/constants/api.js";

export const getMarketOverview = ({ twelveDataApiKey, symbol }) => {
  return $fetch(`${BASE_URL}/quote`, {
    query: {
      symbol: symbol.join(','),
      apikey: twelveDataApiKey
    }
  })
};