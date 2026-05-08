const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect('mongodb+srv://aleale:ale123@cluster0.w5huete.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));


// 📌 Schema for Lost Items
const lostItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  contactEmail: { type: String, required: true }
});

const LostItem = mongoose.model('LostItem', lostItemSchema);

// 📌 API Routes
app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});
// 🌟 Fetch all lost items
app.get('/items', async (req, res) => {
  try {
    const items = await LostItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: '❌ Failed to fetch items', error });
  }
});

// 🌟 Add a new lost item
app.post('/add-item', async (req, res) => {
  try {
    const newItem = new LostItem(req.body);
    await newItem.save();
    res.json({ message: '✅ Item added successfully!', item: newItem });
  } catch (error) {
    res.status(400).json({ message: '❌ Failed to add item', error });
  }
});

// 🌟 Delete an item
app.delete('/delete-item/:id', async (req, res) => {
  try {
    await LostItem.findByIdAndDelete(req.params.id);
    res.json({ message: '✅ Item deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: '❌ Failed to delete item', error });
  }
});

// 🌟 Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
