// Minimal migration to add author_id columns and indexes (idempotent)
// Run with: node scripts/migrate-db.js

const mysql = require('mysql2/promise');
const path = require('node:path');
const { mysqlSettings } = require(path.join('..', 'config.json'));

(async () => {
  const conn = await mysql.createConnection({
    host: mysqlSettings.host,
    user: mysqlSettings.user,
    password: mysqlSettings.password,
    database: mysqlSettings.database,
  });
  try {
    const schema = mysqlSettings.database;

    async function ensureColumn(table, column, def) {
      const [rows] = await conn.execute(
        'SELECT COUNT(*) AS c FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=? AND TABLE_NAME=? AND COLUMN_NAME=?',
        [schema, table, column]
      );
      if (rows[0].c === 0) {
        await conn.execute(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${def}`);
        console.log(`Added column ${table}.${column}`);
      }
    }

    async function ensureIndex(table, index, columns) {
      const [rows] = await conn.execute(
        'SELECT COUNT(*) AS c FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA=? AND TABLE_NAME=? AND INDEX_NAME=?',
        [schema, table, index]
      );
      if (rows[0].c === 0) {
        await conn.execute(`CREATE INDEX \`${index}\` ON \`${table}\` (${columns})`);
        console.log(`Created index ${index} on ${table}(${columns})`);
      }
    }

    await ensureColumn('message_count', 'author_id', 'VARCHAR(32) NULL');
    await ensureColumn('log', 'author_id', 'VARCHAR(32) NULL');
    await ensureIndex('message_count', 'idx_message_count_author_id', '`author_id`');
    await ensureIndex('log', 'idx_log_author_id', '`author_id`');

    // guild_settings table
    const [tables] = await conn.execute(
      'SELECT COUNT(*) AS c FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA=? AND TABLE_NAME=?',
      [schema, 'guild_settings']
    );
    if (tables[0].c === 0) {
      await conn.execute('CREATE TABLE `guild_settings` ( `guild_id` VARCHAR(32) NOT NULL, `default_ephemeral` TINYINT(1) NOT NULL DEFAULT 0, PRIMARY KEY (`guild_id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4');
      console.log('Created table guild_settings');
    } else {
      await ensureColumn('guild_settings', 'default_ephemeral', 'TINYINT(1) NOT NULL DEFAULT 0');
    }

    console.log('Migration complete.');
  } catch (e) {
    console.error('Migration failed:', e);
    process.exitCode = 1;
  } finally {
    await conn.end();
  }
})();
