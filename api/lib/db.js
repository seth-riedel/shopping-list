const mysql = require('mysql');

// @TODO: pull these values from environment variables
const config = {
  db: {
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'shoppinglist',
  },
};

const connectionConfig = {
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
};

const pool = mysql.createPool({
  connectionLimit: 10,
  host: connectionConfig.host,
  user: connectionConfig.user,
  password: connectionConfig.password,
  database: connectionConfig.database,
  multipleStatements: true,
  // function for casting BIT fields to booleans. this is usually automatic in other databases...
  typeCast: (field, useDefaultTypeCasting) => {
    if (field.type === 'BIT' && field.length === 1) {
      const bytes = field.buffer();
      return bytes[0] === 1;
    }

    return useDefaultTypeCasting();
  },
});

const db = {
  getConnection: () => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      return resolve(connection);
    });
  }),

  query: (sql, params) => new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
      if (error) {
        return reject(error);
      }

      return resolve(results);
    });
  }),
};

module.exports = db;
