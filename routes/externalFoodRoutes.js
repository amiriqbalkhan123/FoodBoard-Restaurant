const express = require('express');

const { ensureVerified } = require('../middleware/auth');

const router = express.Router();

const AFGHAN_FOODS = [
  {
    idMeal: 'afghan-1',
    strMeal: 'Kabuli Pulao',
    strCategory: 'Afghan Food',
    strArea: 'Afghan',
    strMealThumb: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
    strInstructions: 'Traditional Afghan rice dish with carrots, raisins, spices, and meat.',
  },
  {
    idMeal: 'afghan-2',
    strMeal: 'Mantu',
    strCategory: 'Afghan Food',
    strArea: 'Afghan',
    strMealThumb: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c',
    strInstructions: 'Afghan dumplings usually filled with minced meat and served with yogurt sauce.',
  },
  {
    idMeal: 'afghan-3',
    strMeal: 'Bolani',
    strCategory: 'Afghan Food',
    strArea: 'Afghan',
    strMealThumb: 'https://images.unsplash.com/photo-1601050690597-df0568f70950',
    strInstructions: 'Stuffed Afghan flatbread commonly filled with potatoes, leeks, or vegetables.',
  },
];

router.get('/external-foods', ensureVerified, async (req, res) => {
  try {
    const search = req.query.search || 'chicken';

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(search)}`
    );

    const data = await response.json();

    res.render('foods/external', {
      meals: data.meals || [],
      afghanFoods: AFGHAN_FOODS,
      search,
    });
  } catch (error) {
    console.log(error);

    res.render('foods/external', {
      meals: [],
      afghanFoods: AFGHAN_FOODS,
      search: '',
    });
  }
});

router.get('/external-foods/random', ensureVerified, async (req, res) => {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/random.php'
    );

    const data = await response.json();

    res.render('foods/external', {
      meals: data.meals || [],
      afghanFoods: AFGHAN_FOODS,
      search: 'Random Meal',
    });
  } catch (error) {
    console.log(error);

    res.redirect('/external-foods');
  }
});

module.exports = router;