import express from "express";
import votesController from "../controllers/votes.controller.js.js";

const router = express.Router();

router.post("/create", votesController.create);
router.get("/list", votesController.list);

export default router;
