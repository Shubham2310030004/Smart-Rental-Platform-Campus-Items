const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Get all items
router.get('/', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };
    if (minPrice || maxPrice) {
      query.dailyRate = {};
      if (minPrice) query.dailyRate.$gte = minPrice;
      if (maxPrice) query.dailyRate.$lte = maxPrice;
    }
    
    const items = await Item.find(query).populate('ownerId', 'name email');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('ownerId').populate('reviews');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create item (vendor only)
router.post('/', authMiddleware, roleMiddleware('vendor'), async (req, res) => {
  try {
    const { name, description, category, dailyRate, condition, images } = req.body;
    
    const item = new Item({
      name,
      description,
      category,
      dailyRate,
      condition,
      images: images || [],
      ownerId: req.userId,
      status: 'available'
    });
    
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update item (vendor only)
router.put('/:id', authMiddleware, roleMiddleware('vendor'), async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.ownerId.toString() !== req.userId) return res.status(403).json({ message: 'Not authorized' });
    
    Object.assign(item, req.body);
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete item (vendor only)
router.delete('/:id', authMiddleware, roleMiddleware('vendor'), async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.ownerId.toString() !== req.userId) return res.status(403).json({ message: 'Not authorized' });
    
    await Item.deleteOne({ _id: req.params.id });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check availability
router.get('/:id/availability', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    
    const bookings = await require('../models/Booking').find({
      itemId: req.params.id,
      status: { $in: ['confirmed', 'active'] },
      startDate: { $lt: new Date(endDate) },
      endDate: { $gt: new Date(startDate) }
    });
    
    res.json({ available: bookings.length === 0, bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
