import express from "express";
import {
  createMusic,
  getAllMusic,
  getMusicByOrchestra,
  updateMusic,
  deleteMusic,
} from "../controllers/musicController.js";
import validateMusic from "../middlewares/musicValidator.js";
import parseMultipartyForm from "../middlewares/multipartyHandler.js";

const musicRouter = express.Router();

musicRouter.post("/music", parseMultipartyForm, validateMusic, createMusic);
musicRouter.get("/music", getAllMusic);
musicRouter.get("/music/:orchestraId", getMusicByOrchestra);
musicRouter.put("/music/:id", validateMusic, updateMusic);
musicRouter.delete("/music/:id", deleteMusic);

export default musicRouter;