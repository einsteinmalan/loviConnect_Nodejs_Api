const connection = require('../config/database');

export async function createSysBlock(userId, reason) {
    try {
        const result = await connection.query('INSERT INTO sys_blocks (id_user, reason) VALUES (?, ?)', [userId, reason]);
        return result.insertId;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getSysBlockById(sysBlockId) {
    try {
        const result = await connection.query('SELECT * FROM sys_blocks WHERE id = ?', [sysBlockId]);
        return result[0];
    } catch (error) {
        throw new Error(error);
    }
}

export async function getAllSysBlocksByUserId(userId) {
    try {
        const result = await connection.query('SELECT * FROM sys_blocks WHERE id_user = ?', [userId]);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateSysBlockById(sysBlockId, newUserId, newReason) {
    try {
        await connection.query('UPDATE sys_blocks SET id_user = ?, reason = ? WHERE id = ?', [newUserId, newReason, sysBlockId]);
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteSysBlockById(sysBlockId) {
    try {
        await connection.query('DELETE FROM sys_blocks WHERE id = ?', [sysBlockId]);
    } catch (error) {
        throw new Error(error);
    }
}
