import express from "express";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(express.json()); // IMPORTANTISSIMO

app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});