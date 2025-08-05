import express from "express";
import tagController from "../controllers/tag.controller.js";

const router = express.Router();

router.get("/list", tagController.list);

export default router;
