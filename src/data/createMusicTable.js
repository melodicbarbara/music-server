import pool from "../config/db.js"

const createMusicTable = async () => {
    const queryTxt = `
    CREATE TABLE IF NOT EXISTS music (
    id SERIAL PRIMARY KEY,
    content BYTEA NOT NULL,
    title VARCHAR(100) NOT NULL,
    orchestra VARCHAR(100),
    concerts VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
)
    `
    try {
        await pool.query(queryTxt);
        console.log("Music table created if not exists");
    } catch (error) {
        console.error("Error creating music table: ", error);
        throw error; // Propagate the error to the caller
    }
}

export default createMusicTable;