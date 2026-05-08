const express = require('express');

const Food = require('../models/Food');

const router = express.Router();

const buildFoodPayload = (body) => {
  return {
    name: body.name,
    description: body.description,
    category: body.category,
    price: Number(body.price),
    imageUrl: body.imageUrl,
    availability: body.availability === true || body.availability === 'on',
    cuisine: body.cuisine || 'Afghan',
    spiceLevel: body.spiceLevel || 'Medium',
    prepTime: Number(body.prepTime) || 20,
    calories: Number(body.calories) || 0,
    isFeatured: body.isFeatured === true || body.isFeatured === 'on',
    isTrending: body.isTrending === true || body.isTrending === 'on',
  };
};

router.get('/foods', async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: foods.length,
      data: foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
});

router.get('/foods/stats/overview', async (req, res) => {
  try {
    const totalFoods = await Food.countDocuments();
    const availableFoods = await Food.countDocuments({ availability: true });
    const featuredFoods = await Food.countDocuments({ isFeatured: true });
    const trendingFoods = await Food.countDocuments({ isTrending: true });
    const favoriteFoods = await Food.countDocuments({ isFavorite: true });

    res.json({
      success: true,
      data: {
        totalFoods,
        availableFoods,
        featuredFoods,
        trendingFoods,
        favoriteFoods,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Stats Error',
    });
  }
});

router.get('/foods/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found',
      });
    }

    res.json({
      success: true,
      data: food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
});

router.post('/foods', async (req, res) => {
  try {
    const food = await Food.create(buildFoodPayload(req.body));

    res.status(201).json({
      success: true,
      message: 'Food created successfully',
      data: food,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.put('/foods/:id', async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      buildFoodPayload(req.body),
      {
        new: true,
        runValidators: true,
      }
    );

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found',
      });
    }

    res.json({
      success: true,
      message: 'Food updated successfully',
      data: food,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.patch('/foods/:id/favorite', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found',
      });
    }

    food.isFavorite = !food.isFavorite;

    await food.save();

    res.json({
      success: true,
      message: 'Favorite status updated',
      data: food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Favorite update failed',
    });
  }
});

router.delete('/foods/:id', async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found',
      });
    }

    res.json({
      success: true,
      message: 'Food deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
});

module.exports = router;