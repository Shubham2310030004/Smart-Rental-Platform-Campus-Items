const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { authMiddleware } = require('../middleware/auth');

// Create booking
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { itemId, startDate, endDate, totalPrice } = req.body;
    
    const booking = new Booking({
      itemId,
      renterId: req.userId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice,
      status: 'pending',
      createdAt: new Date()
    });
    
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user bookings
router.get('/', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ renterId: req.userId })
      .populate('itemId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get booking details
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('itemId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel booking
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Booking.deleteOne({ _id: req.params.id });
    res.json({ message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
