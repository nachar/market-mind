import pool from '../utils/database.js'

export const saveStockNews = async ({ symbol, from, to, news }) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const query = `
      INSERT INTO stock_news (
        finnhub_id,
        symbol,
        search_from,
        search_to,
        category,
        datetime,
        headline,
        image,
        related,
        source,
        summary,
        url
      )
      VALUES (
        $1, $2, $3, $4, $5,
        TO_TIMESTAMP($6), $7, $8, $9, $10, $11, $12
      )
      ON CONFLICT (symbol, finnhub_id)
      DO UPDATE SET
        search_from = EXCLUDED.search_from,
        search_to = EXCLUDED.search_to,
        category = EXCLUDED.category,
        datetime = EXCLUDED.datetime,
        headline = EXCLUDED.headline,
        image = EXCLUDED.image,
        related = EXCLUDED.related,
        source = EXCLUDED.source,
        summary = EXCLUDED.summary,
        url = EXCLUDED.url
    `

    for (const item of news) {
      await client.query(query, [
        item.id,
        symbol,
        from,
        to,
        item.category || null,
        item.datetime,
        item.headline,
        item.image || null,
        item.related || null,
        item.source || null,
        item.summary || null,
        item.url || null
      ])
    }

    await client.query('COMMIT')

    return news.length
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}