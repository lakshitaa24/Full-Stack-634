// index.js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory seats
const seats = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  status: 'available',
}));

// Lock timeout in milliseconds
const LOCK_TIMEOUT = 5000; // 5 seconds

// GET all seats
app.get('/seats', (req, res) => {
  res.json(seats);
});

// POST book a seat
app.post('/book', (req, res) => {
  const { seatId } = req.body;
  if (!seatId) return res.status(400).send("seatId is required");

  const seat = seats.find(s => s.id === seatId);
  if (!seat) return res.status(404).send("Seat not found");

  // Check seat status
  if (seat.status === 'booked') return res.status(400).send("Seat already booked");
  if (seat.status === 'locked') return res.status(400).send("Seat is temporarily locked");

  // Lock the seat
  seat.status = 'locked';
  console.log(`Seat ${seatId} locked for booking.`);

  // Simulate async booking (e.g., payment processing)
  setTimeout(() => {
    // Confirm booking
    seat.status = 'booked';
    console.log(`Seat ${seatId} booked successfully.`);
  }, 2000); // 2-second simulated processing

  // Auto-release lock if user does not complete in time
  setTimeout(() => {
    if (seat.status === 'locked') {
      seat.status = 'available';
      console.log(`Seat ${seatId} lock released due to timeout.`);
    }
  }, LOCK_TIMEOUT);

  res.send(`Seat ${seatId} is locked for booking. Confirming soon...`);
});

// GET a single seat
app.get('/seats/:id', (req, res) => {
  const seat = seats.find(s => s.id === parseInt(req.params.id));
  if (!seat) return res.status(404).send("Seat not found");
  res.json(seat);
});

// Start server
app.listen(PORT, () => {
  console.log(`Ticket booking server running on http://localhost:${PORT}`);
});
