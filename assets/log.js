const { query } = require('../assets/mysql');

async function messageCount(message) {
    const author = message.author.username;
    const authorId = message.author.id;
    const selectSql = 'SELECT id, author_id, message_count FROM message_count WHERE author_id = ? OR author = ? LIMIT 1';
    const results = await query(selectSql, [authorId, author]);
    if (!results || results.length === 0) {
        const insertSql = 'INSERT INTO message_count (author, author_id, message_count) VALUES (?, ?, 1)';
        await query(insertSql, [author, authorId]);
    } else {
        const row = results[0];
        const newCount = row.message_count + 1;
        const messageID = row.id;
        const updateSql = 'UPDATE message_count SET message_count = ?, author = COALESCE(?, author), author_id = COALESCE(?, author_id) WHERE id = ?';
        await query(updateSql, [newCount, author, authorId, messageID]);
    }
}

async function log(message) {
    const channel = message.channel.id;
    const messageContent = encodeURI(message.content || '');
    const author = message.author.username;
    const authorId = message.author.id;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;
    const insertSql = 'INSERT INTO log (author, author_id, channel, message, created_at) VALUES (?,?,?,?,?)';
    const values = [author, authorId, channel, messageContent, dateTime];
    await query(insertSql, values);
}

module.exports = { messageCount, log }
