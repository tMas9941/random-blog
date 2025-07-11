import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post("/registration", userController.create);

export default router;
