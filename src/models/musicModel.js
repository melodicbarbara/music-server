import pool from "../config/db.js"

export const getAllMusicsService = async () => {
    const result = await pool.query("SELECT * FROM music");
    return  result.rows;
};
export const getMusicByOrchestraService = async (orchestra) => {
    const result = await pool.query("SELECT * FROM music where orchestraId = $1", [orchestra]);
    return result.rows[0];
};
export const createMusicService = async (title, orchestra, concerts, content) => {
    const result = await pool.query("INSERT INTO music (title, orchestra, concerts, content) VALUES ($1, $2, $3, $4) RETURNING *", [title, orchestra, concerts, content]);
    return result.rows[0];
};
export const updateMusicService = async (id, title, orchestra, concerts, content) => {
    const result = await pool.query("UPDATE music SET name=$1, email=$2 WHERE id=$3 RETURNING *", [title, orchestra, concerts, content]);
    return result.rows[0];
};
export const deleteMusicService = async (id) => {
    const result = await pool.query("DELETE FROM music where id=$1 RETURNING *", [id]);
    return result.rows[0];
};