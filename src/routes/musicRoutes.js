import express from "express";
import multer from "multer";
import {
  createMusic,
  getAllMusic,
  getMusicByOrchestra,
  updateMusic,
  deleteMusic,
} from "../controllers/musicController.js";
import validateMusic from "../middlewares/musicValidator.js";
import parseMultipartyForm from "../middlewares/multipartyHandler.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const debugMiddleware = (req, res, next) => {
    console.log('Incoming request:', {
        contentType: req.headers['content-type'],
        files: req.files,
        file: req.file,
        body: req.body
    });
    next();
};

const musicRouter = express.Router();

// Simplify route middleware chain
musicRouter.post("/music", upload.single('content'), debugMiddleware, validateMusic, createMusic);
musicRouter.get("/music", getAllMusic);
musicRouter.get("/music/:orchestraId", getMusicByOrchestra);
musicRouter.put("/music/:id", validateMusic, updateMusic);
musicRouter.delete("/music/:id", deleteMusic);

export default musicRouter;