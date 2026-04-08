import express from "express";
import authRoutes from "./routes/auth.js";
import cors from "cors";

const app = express();


app.use(cors({
  origin: "http://localhost:5173" // permette solo il tuo frontend locale
}));

app.use(express.json()); // IMPORTANTISSIMO

app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});