import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();

// CORS per il frontend locale
app.use(cors({
  origin: "http://localhost:5173", // il tuo frontend locale
  credentials: true
}));

app.use(express.json());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});