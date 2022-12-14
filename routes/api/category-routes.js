// Initializing the router from express
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [ Product ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single category
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [ Product ],
    });
    if (!categoryData) {
      res.status(404).json({message: `No category found with id ${req.params.id} !` });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new category 
router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    console.log(`auto-generated id of new category ${categoryData.id} `);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT (UPDATE) a single category
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    // console.log(` = = = = = category put:id ${req.params.id}`);
    // if (!req.body.category_name) {
    //   res
    //   .status(404)
    //   .json({ message: `No input category name found!` });
    //   return;
    // }
    const updateValues = {
      category_name: req.body.category_name
    };
    const updateConditions = {
      where: {
        id: req.params.id
      }
      // returning: true,
      // plain: true
    };
    // const categoryData = await Category.update(req.body, { where: { id: req.params.id } });
    const categoryData = await Category.update(updateValues, updateConditions);
    // console.log(` = = = = = category response = = = = = =`);
    // console.log(res);
    if (!categoryData) {
      res
      .status(404)
      .json({ message: `No category found with  id ${req.params.id} !` });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a category by id
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    // if (!categoryData) {
    //   res.status(404).json({ message: `No category found with that id ${req.params.id} !` });
    //   return;
    // }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
