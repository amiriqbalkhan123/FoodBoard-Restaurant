const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Food name is required'],
      trim: true,
      minlength: 2,
      maxlength: 80,
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: 10,
      maxlength: 800,
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },

    imageUrl: {
      type: String,
      default: '',
      trim: true,
    },

    availability: {
      type: Boolean,
      default: true,
    },

    cuisine: {
      type: String,
      default: 'Afghan',
      trim: true,
    },

    spiceLevel: {
      type: String,
      enum: ['Mild', 'Medium', 'Spicy', 'Very Spicy'],
      default: 'Medium',
    },

    prepTime: {
      type: Number,
      default: 20,
      min: 1,
    },

    calories: {
      type: Number,
      default: 0,
      min: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isTrending: {
      type: Boolean,
      default: false,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    ratingTotal: {
      type: Number,
      default: 0,
    },

    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

foodSchema.virtual('ratingAverage').get(function () {
  if (this.ratingCount === 0) {
    return 0;
  }

  return Number((this.ratingTotal / this.ratingCount).toFixed(1));
});

foodSchema.set('toJSON', { virtuals: true });
foodSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Food', foodSchema);