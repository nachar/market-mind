import pool from '../../utils/database.js'

export default defineEventHandler(async () => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    await client.query(`
      TRUNCATE TABLE
        asset_price_history,
        asset_price_history_daily,
        stock_news
    `)

    await client.query('COMMIT')

    return {
      success: true,
      message: 'All database tables have been cleared'
    }
  } catch (error) {
    await client.query('ROLLBACK')

    console.error('Database clearing error:', error)

    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  } finally {
    client.release()
  }
})