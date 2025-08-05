import express from "express";
import postTagController from "../controllers/post-tag.controller.js";

const router = express.Router();

router.get("/list", postTagController.list);

export default router;
