const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TaskManager',
  password: '123456',
  port: 5432,
});
module.exports = pool;