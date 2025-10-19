const { query } = require('./mysql');

async function getDefaultEphemeral(guildId) {
  if (!guildId) return false;
  const rows = await query('SELECT default_ephemeral FROM guild_settings WHERE guild_id = ? LIMIT 1', [guildId]);
  if (!rows || rows.length === 0) return false;
  return rows[0].default_ephemeral === 1 || rows[0].default_ephemeral === true;
}

async function setDefaultEphemeral(guildId, value) {
  if (!guildId) throw new Error('Missing guildId');
  const v = value ? 1 : 0;
  // Upsert-like behavior
  await query('INSERT INTO guild_settings (guild_id, default_ephemeral) VALUES (?, ?) ON DUPLICATE KEY UPDATE default_ephemeral = VALUES(default_ephemeral)', [guildId, v]);
}

module.exports = { getDefaultEphemeral, setDefaultEphemeral };

