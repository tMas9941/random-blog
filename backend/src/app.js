import express from "express";

import errorHandler from "./middlewares/error-handler.middleware.js";
// routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandler);

// app.use("/", (req, res) => {
// 	res.status(404).send("No Endpoint");
// });

export default app;
