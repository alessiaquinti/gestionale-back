import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();

// CORS PRIMA di tutto
app.use(cors({
  origin: ["http://localhost:5173"],  // frontend locale
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use("/auth", authRoutes);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));