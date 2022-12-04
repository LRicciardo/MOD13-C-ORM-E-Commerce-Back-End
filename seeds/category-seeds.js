const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];

// seeds (loads) the Category Table
// This will not throw an error, all instances will be created
const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
