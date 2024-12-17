const express = require("express");
const app = express(); // Initialize the app
const prisma = require("./prisma/index"); // Correct Prisma path
const morgan = require("morgan");

const PORT = 5555;

// Body-parsing middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
/** GET /api/players - returns an array of all players */
app.get("/api/players", async (req, res, next) => {
  try {
    const players = await prisma.player.findMany();
    res.json(players);
  } catch (error) {
    next(error);
  }
});

/** POST /api/players - creates a new player with the information provided in the request body */
app.post("/api/players", async (req, res, next) => {
  try {
    const { name, breed, status } = req.body;
    const player = await prisma.player.create({
      data: { name, breed, status },
    });
    res.status(201).json(player);
  } catch (error) {
    next(error);
  }
});

/** GET /api/players/:id - returns a single player with the specified id */
app.get("/api/players/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const player = await prisma.player.findUnique({
      where: { id },
    });
    res.json(player);
  } catch (error) {
    next(error);
  }
});

/** PUT /api/players/:id - updates the player status */
app.put("/api/players/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const { status } = req.body;

    const player = await prisma.player.update({
      where: { id },
      data: { status },
    });
    res.json(player);
  } catch (error) {
    next(error);
  }
});

/** DELETE /api/players/:id - deletes the player */
app.delete("/api/players/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    await prisma.player.delete({ where: { id } });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Simple error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status ?? 500;
  const message = err.message ?? "Internal server error.";
  res.status(status).json({ message });
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
