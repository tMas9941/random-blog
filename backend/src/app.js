import express, { json } from "express";
import cors from "cors";

import errorHandler from "./middlewares/error-handler.middleware.js";

// routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import tagRoutes from "./routes/tag.routes.js";
import postTagRoutes from "./routes/post-tag.routes.js";
import postVoteRoutes from "./routes/post-vote.routes.js";
import commentVoteRoutes from "./routes/comment-vote.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import profileRoutes from "./routes/profile.routes.js";

import { FRONTEND_URL } from "./constants/constants.js";

const app = express();

app.use(cors({ origin: FRONTEND_URL }));

app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/tag", tagRoutes);
app.use("/api/post-tag", postTagRoutes);
app.use("/api/post-vote", postVoteRoutes);
app.use("/api/comment-vote", commentVoteRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/profile", profileRoutes);

app.use(errorHandler);

app.use("/", (req, res) => {
	res.status(404).send("No Endpoint");
});

export default app;
