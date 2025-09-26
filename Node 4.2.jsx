// server.js

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store for cards
let cards = [];
let nextId = 1;

// 🏠 Root endpoint
app.get('/', (req, res) => {
  res.send('🎴 Welcome to the Playing Card Collection API');
});

// 📄 GET /cards - List all cards
app.get('/cards', (req, res) => {
  res.json(cards);
});

// 🔍 GET /cards/:id - Retrieve a card by ID
app.get('/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const card = cards.find(c => c.id === id);

  if (!card) {
    return res.status(404).json({ error: 'Card not found' });
  }

  res.json(card);
});

// ➕ POST /cards - Add a new card
app.post('/cards', (req, res) => {
  const { suit, value } = req.body;

  if (!suit || !value) {
    return res.status(400).json({ error: 'Suit and value are required' });
  }

  const newCard = {
    id: nextId++,
    suit,
    value
  };

  cards.push(newCard);
  res.status(201).json(newCard);
});

// ❌ DELETE /cards/:id - Delete a card by ID
app.delete('/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = cards.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Card not found' });
  }

  const deleted = cards.splice(index, 1);
  res.json({ message: 'Card deleted', card: deleted[0] });
});

// 🚀 Start the server
app.listen(PORT, () => {
  console.log(`🎴 Playing Card API running at http://localhost:${PORT}`);
});
