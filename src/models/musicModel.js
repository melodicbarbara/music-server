import pool from "../config/db.js"

export const getAllMusicsService = async () => {
    const result = await pool.query("SELECT * FROM music");
    return  result.rows;
};
export const getMusicByOrchestraService = async (orchestra) => {
    const result = await pool.query("SELECT * FROM music where orchestraId = $1", [orchestra]);
    return result.rows[0];
};
export const createMusicService = async (musicData) => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        console.log('Received music data:', {
            title: musicData.title,
            orchestra: musicData.orchestra,
            hasContent: !!musicData.content,
            contentType: typeof musicData.content
        });

        if (!musicData.content || !Buffer.isBuffer(musicData.content)) {
            throw new Error('Invalid content format - must be a Buffer');
        }

        const query = `
            INSERT INTO music (title, orchestra, concerts, content)
            VALUES ($1, $2, $3, $4)
            RETURNING id, title, orchestra, concerts, created_at
        `;
        
        const values = [
            musicData.title,
            musicData.orchestra,
            musicData.concerts,
            musicData.content
        ];

        const result = await client.query(query, values);
        await client.query('COMMIT');
        
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Database error:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });
        throw error;
    } finally {
        client.release();
    }
};
export const updateMusicService = async (id, title, orchestra, concerts, content) => {
    const result = await pool.query("UPDATE music SET name=$1, email=$2 WHERE id=$3 RETURNING *", [title, orchestra, concerts, content]);
    return result.rows[0];
};
export const deleteMusicService = async (id) => {
    const result = await pool.query("DELETE FROM music where id=$1 RETURNING *", [id]);
    return result.rows[0];
};