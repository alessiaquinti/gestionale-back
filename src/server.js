import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();

// PERMETTI AL FRONTEND DI CHIAMARE IL BACKEND ONLINE
app.use(cors({
  origin: "http://localhost:5173", // il tuo frontend locale
  credentials: true              // permette cookie/sessioni se serve
}));

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});