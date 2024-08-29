const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgresql://postgres:271127@localhost:5432/Assignment",
});
pool.connect()
  .then(() => console.log('Connected successfully'))
  .catch(e => console.error('Connection error', e.stack))
  

module.exports = pool;
