import pool from '../utils/database.js'

export const saveAssetHistory = async ({ meta, values }) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const query = `
      INSERT INTO asset_price_history (
        symbol,
        time_interval,
        datetime,
        open,
        high,
        low,
        close,
        volume,
        currency,
        exchange_timezone,
        exchange,
        mic_code,
        asset_type
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13
      )
      ON CONFLICT (symbol, time_interval, datetime)
      DO UPDATE SET
        open = EXCLUDED.open,
        high = EXCLUDED.high,
        low = EXCLUDED.low,
        close = EXCLUDED.close,
        volume = EXCLUDED.volume,
        currency = EXCLUDED.currency,
        exchange_timezone = EXCLUDED.exchange_timezone,
        exchange = EXCLUDED.exchange,
        mic_code = EXCLUDED.mic_code,
        asset_type = EXCLUDED.asset_type
    `

    for (const item of values) {
      await client.query(query, [
        meta.symbol,
        meta.interval,
        item.datetime,
        item.open,
        item.high,
        item.low,
        item.close,
        item.volume,
        meta.currency,
        meta.exchange_timezone,
        meta.exchange,
        meta.mic_code,
        meta.type
      ])
    }

    await client.query('COMMIT')

    return values.length
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}