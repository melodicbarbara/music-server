import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import validateUser from "../middlewares/inputValidator.js";

const userRouter = express.Router();

userRouter.post("/user", validateUser, createUser);
userRouter.get("/users", getAllUsers); 
userRouter.get("/user/:id", getUserById);
userRouter.put("/user/:id", validateUser, updateUser);
userRouter.delete("/user/:id", deleteUser);

export default userRouter;
