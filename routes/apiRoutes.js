const express = require('express');

const Food = require('../models/Food');

const router = express.Router();

router.get('/foods', async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });

    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/foods/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.json(food);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/foods', async (req, res) => {
  try {
    const food = await Food.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      availability: req.body.availability === true || req.body.availability === 'on',
    });

    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/foods/:id', async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        availability: req.body.availability === true || req.body.availability === 'on',
      },
      { new: true }
    );

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.json(food);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/foods/:id', async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;