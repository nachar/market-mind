import { FINANCE_AI_BASE_URL } from '#server/constants/api.js'

export const analyzeMarket = ({ market_data, news = [] }) => {
  return $fetch(`${FINANCE_AI_BASE_URL}/analyze`, {
    method: 'POST',
    body: {
      market_data,
      news
    }
  })
}