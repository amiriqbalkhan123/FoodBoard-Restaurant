const express = require('express');

const Food = require('../models/Food');

const { ensureVerified } = require('../middleware/auth');

const router = express.Router();

const buildFoodData = (body) => {
  return {
    name: body.name,
    description: body.description,
    category: body.category,
    price: body.price,
    imageUrl: body.imageUrl,
    availability: body.availability === 'on',
  };
};

router.get('/dashboard', ensureVerified, async (req, res) => {
  try {
    const { search, category } = req.query;

    const query = {};

    if (search && search.trim() !== '') {
      query.name = {
        $regex: search.trim(),
        $options: 'i',
      };
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    const foods = await Food.find(query).sort({
      createdAt: -1,
    });

    const categories = await Food.distinct('category');

    res.render('foods/index', {
      foods,
      categories,
      search: search || '',
      selectedCategory: category || 'All',
    });
  } catch (error) {
    console.log(error);
    res.send('Server Error');
  }
});

router.get('/foods/new', ensureVerified, (req, res) => {
  res.render('foods/create');
});

router.post('/foods', ensureVerified, async (req, res) => {
  try {
    await Food.create(buildFoodData(req.body));

    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.send('Error Creating Food');
  }
});

router.get('/foods/edit/:id', ensureVerified, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.send('Food Not Found');
    }

    res.render('foods/edit', {
      food,
    });
  } catch (error) {
    console.log(error);
    res.send('Error Loading Edit Page');
  }
});

router.put('/foods/:id', ensureVerified, async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      buildFoodData(req.body),
      {
        new: true,
        runValidators: true,
      }
    );

    if (!food) {
      return res.send('Food Not Found');
    }

    res.redirect(`/foods/${food._id}`);
  } catch (error) {
    console.log(error);
    res.send('Error Updating Food');
  }
});

router.delete('/foods/:id', ensureVerified, async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.send('Food Not Found');
    }

    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.send('Error Deleting Food');
  }
});

router.get('/foods/:id', ensureVerified, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.send('Food Not Found');
    }

    res.render('foods/show', {
      food,
    });
  } catch (error) {
    console.log(error);
    res.send('Error Loading Food');
  }
});

module.exports = router;