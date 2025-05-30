import sql from 'mssql';



export async function queryLatestUser() {
  const dbConfig = {
    user: 'dummy',
    password: 'dummy',
    server: 'dummy',
    database: 'dummy',
    options: {
      encrypt: false,  // mssql generally don't require encrypt as DB is in local machine
      trustServerCertificate: true,
    },
  };

  let pool;
  try {
    pool = await sql.connect(dbConfig);
    // this query fetchs credentials, company id of the last created account 
    const result = await pool.request().query(`
      SELECT TOP 1 id, UserId, Pwd
      FROM PortalUser
      ORDER BY id DESC;
    `);
    return result.recordset[0];
  } catch (err) {
    console.error('DB query error:', err);
    throw err;
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}
