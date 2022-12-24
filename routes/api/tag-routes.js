// Initializing the router from express
const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [Product]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [Product]
    });
    if (!tagData) {
      res
        .status(404)
        .json({ message: `No tag found with id ${req.params.id} !` });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post("/", async (req, res) => {
  // sample post
  //   {
  // 		 tag_name: "Adult Small 9-10"
  //   }
  // (Tag) id is auto-incremented so field is omitted
  try {
    const newValues = {
      tag_name: req.body.tag_name
    };
    const tagData = await Tag.create(newValues);
    console.log(`auto-generated id of new tag ${tagData.id} `);
    res.status(200).json(tagData);
    // res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  // req.body should look like this...
  //   {
  // 		"tag_name": "Adult Small 9-10"
  //   }
  // (Tag) id is passed in by the routing parameter :id
  try {
    // console.log(`====> inside tag-routes put with param.id ${req.params.id}`);
    const updateValues = {
      tag_name: req.body.tag_name
    };
    const updateConditions = {
      where: {
        id: req.params.id
      }
    };
    const tagData = await Tag.update(updateValues, updateConditions);

    if (!tagData) {
      res
        .status(404)
        .json({ message: `No tag found with id ${req.params.id} !` });
      return;
    }
    // res.status(200).json(updateValues);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    // if (!tagData) {
    //   res.status(404).json({ message: `No tag found with id ${req.params.id} !` });
    //   return;
    // }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
