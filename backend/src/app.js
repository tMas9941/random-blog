import express from "express";
import cors from "cors";

import errorHandler from "./middlewares/error-handler.middleware.js";

// routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

import { FRONTEND_URL } from "./constants/constants.js";

const app = express();

app.use(cors({ origin: FRONTEND_URL }));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.use(errorHandler);

// app.use("/", (req, res) => {
// 	res.status(404).send("No Endpoint");
// });

export default app;
