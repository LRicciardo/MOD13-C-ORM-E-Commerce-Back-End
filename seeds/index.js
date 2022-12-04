const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  // (sync) creates table
  // (force: true) if table exists, drops table then recreates
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');
// ProductTags need to be done last to link the Product and
//   Tag tables (the ids have to be assigned first)
  await seedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');
// exit the process (returns to the CLI TERMINAL)
  process.exit(0);
};

seedAll();
