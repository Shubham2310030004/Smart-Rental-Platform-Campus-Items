const Booking = require('../models/Booking');
const Item = require('../models/Item');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createBooking = async (req, res) => {
  try {
    const { itemId, startDate, endDate, paymentMethodId } = req.body;
    const userId = req.userId;
    
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Check availability
    const conflictingBooking = await Booking.findOne({
      itemId,
      $or: [
        { startDate: { $lt: endDate }, endDate: { $gt: startDate } }
      ]
    });
    
    if (conflictingBooking) {
      return res.status(400).json({ message: 'Item not available for selected dates' });
    }
    
    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalAmount = item.dailyRate * days * 100; // in cents
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true
    });
    
    const booking = new Booking({
      userId,
      itemId,
      startDate,
      endDate,
      totalAmount: totalAmount / 100,
      status: 'confirmed',
      paymentIntentId: paymentIntent.id
    });
    
    await booking.save();
    res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId }).populate('itemId');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
    res.status(200).json({ message: 'Booking cancelled', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
