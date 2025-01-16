import pool from "./config/db.js"
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.port || 3001;

// Middlewares
app.use(express.json());
app.use(cors());


// Routes


// Error handling  middleware

// Testing POSTGRES Connection
app.get("/", async (req, res) => {
    console.log("Start");
    const result = await pool.query("SELECT current_database()");
    console.log("end");
    res.send(`The database name is : ${result.rows[0].current_database}`)
})

// Set up file storage  
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Endpoint to upload PDF  
app.post('/upload', upload.single('pdf'), (req, res) => {
    res.send({ message: 'File uploaded successfully', filename: req.file.filename });
});

// Endpoint to retrieve PDF  
app.get('/pdf/:filename', (req, res) => {
    const filePath = path.join(__dirname, '/uploads', req.params.filename);
    res.sendFile(filePath);
});

// Server running 
app.listen(port, () => console.log(`Server running on port ${port}`));