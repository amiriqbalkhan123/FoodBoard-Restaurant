const express = require('express');

const Food = require('../models/Food');

const { ensureVerified } = require('../middleware/auth');

const router = express.Router();

const buildFoodData = (body) => {
  return {
    name: body.name,
    description: body.description,
    category: body.category,
    price: Number(body.price),
    imageUrl: body.imageUrl,
    availability: body.availability === 'on',
    cuisine: body.cuisine || 'Afghan',
    spiceLevel: body.spiceLevel || 'Medium',
    prepTime: Number(body.prepTime) || 20,
    calories: Number(body.calories) || 0,
    isFeatured: body.isFeatured === 'on',
    isTrending: body.isTrending === 'on',
  };
};

router.get('/dashboard', ensureVerified, async (req, res) => {
  try {
    const {
      search,
      category,
      availability,
      sort,
    } = req.query;

    const query = {};

    if (search && search.trim() !== '') {
      query.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
        { cuisine: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (availability === 'Available') {
      query.availability = true;
    }

    if (availability === 'Unavailable') {
      query.availability = false;
    }

    let sortOption = { createdAt: -1 };

    if (sort === 'priceLow') {
      sortOption = { price: 1 };
    }

    if (sort === 'priceHigh') {
      sortOption = { price: -1 };
    }

    if (sort === 'rating') {
      sortOption = { ratingTotal: -1 };
    }

    const foods = await Food.find(query).sort(sortOption);
    const categories = await Food.distinct('category');

    const featuredFoods = await Food.find({ isFeatured: true }).limit(6).sort({ createdAt: -1 });
    const trendingFoods = await Food.find({ isTrending: true }).limit(6).sort({ createdAt: -1 });

    const totalFoods = await Food.countDocuments();
    const availableFoods = await Food.countDocuments({ availability: true });
    const unavailableFoods = await Food.countDocuments({ availability: false });
    const favoriteFoods = await Food.countDocuments({ isFavorite: true });
    const featuredCount = await Food.countDocuments({ isFeatured: true });
    const trendingCount = await Food.countDocuments({ isTrending: true });

    res.render('foods/index', {
      foods,
      categories,
      featuredFoods,
      trendingFoods,
      search: search || '',
      selectedCategory: category || 'All',
      selectedAvailability: availability || 'All',
      selectedSort: sort || 'newest',
      stats: {
        totalFoods,
        availableFoods,
        unavailableFoods,
        favoriteFoods,
        featuredCount,
        trendingCount,
      },
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
    res.send('Error Creating Food. Please check all required fields.');
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
    res.send('Error Updating Food. Please check all required fields.');
  }
});

router.post('/foods/:id/favorite', ensureVerified, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.send('Food Not Found');
    }

    food.isFavorite = !food.isFavorite;

    await food.save();

    res.redirect(req.get('Referrer') || '/dashboard');
  } catch (error) {
    console.log(error);
    res.send('Favorite Update Failed');
  }
});

router.post('/foods/:id/rate', ensureVerified, async (req, res) => {
  try {
    const rating = Number(req.body.rating);

    if (!rating || rating < 1 || rating > 5) {
      return res.send('Invalid rating');
    }

    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.send('Food Not Found');
    }

    food.ratingTotal += rating;
    food.ratingCount += 1;

    await food.save();

    res.redirect(`/foods/${food._id}`);
  } catch (error) {
    console.log(error);
    res.send('Rating Failed');
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

router.get('/restaurant-profile', ensureVerified, async (req, res) => {
  try {
    const totalFoods = await Food.countDocuments();
    const availableFoods = await Food.countDocuments({ availability: true });
    const featuredFoods = await Food.countDocuments({ isFeatured: true });
    const trendingFoods = await Food.countDocuments({ isTrending: true });
    const categories = await Food.distinct('category');

    res.render('foods/profile', {
      totalFoods,
      availableFoods,
      featuredFoods,
      trendingFoods,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.send('Profile Error');
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