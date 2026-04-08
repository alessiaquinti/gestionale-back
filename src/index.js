import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth.js"; // percorso corretto del tuo auth.js

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);

// --- GET tutte le prenotazioni ---
app.get("/prenotazioni", async (req, res) => {
  try {
    const prenotazioni = await prisma.prenotazione.findMany({ orderBy: { checkIn: "asc" } });
    res.json(prenotazioni);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossibile recuperare le prenotazioni" });
  }
});

// --- GET prenotazione singola ---
app.get("/prenotazioni/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const prenotazione = await prisma.prenotazione.findUnique({ where: { id } });
    if (!prenotazione) return res.status(404).json({ error: "Prenotazione non trovata" });
    res.json(prenotazione);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore server" });
  }
});

// --- POST nuova prenotazione ---
app.post("/prenotazioni", async (req, res) => {
  const { nomeOspite, mailOspite, noteOspite, depositOspite, quotationOspite, channel, quantityOspite, camera, checkIn, checkOut, colore } = req.body;
  try {
    const nuova = await prisma.prenotazione.create({
      data: {
        nomeOspite,
        mailOspite,
        noteOspite,
        depositOspite,
        quotationOspite,
        channel,
        quantityOspite,
        camera,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        colore,
      },
    });
    res.status(201).json(nuova);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossibile creare la prenotazione" });
  }
});

// --- PATCH modifica prenotazione ---
app.patch("/prenotazioni/:id", async (req, res) => {
  console.log("BODY PATCH:", req.body);
  const { id } = req.params;
  const { nomeOspite, mailOspite, noteOspite, depositOspite, quotationOspite, channel, quantityOspite, camera, checkIn, checkOut, colore } = req.body;
  try {
    const aggiornata = await prisma.prenotazione.update({
      where: { id },
      data: {
        nomeOspite,
        mailOspite,
        noteOspite,
        depositOspite,
        quotationOspite,
        channel,
        quantityOspite,
        camera,
  ...(checkIn && { checkIn: new Date(checkIn) }),
  ...(checkOut && { checkOut: new Date(checkOut) }),
        colore,
      },
    });
    res.json(aggiornata);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossibile aggiornare la prenotazione" });
  }
});

// --- DELETE prenotazione ---
app.delete("/prenotazioni/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.prenotazione.delete({ where: { id } });
    res.json({ message: "Prenotazione eliminata" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossibile eliminare la prenotazione" });
  }
});

import { authMiddleware } from "./middleware/authMiddleware.js";

app.get("/test-protetto", authMiddleware, (req, res) => {
  res.json({
    message: "Accesso consentito 🎉",
    user: req.user,
  });
});

// Avvio server
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});