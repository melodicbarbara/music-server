const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv')

dotenv.config();

const app = express();
const port = process.env.port || 3001;

// Middlewares
app.use(express.json());
app.use(cors());


// Routes


// Error handling  middleware


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