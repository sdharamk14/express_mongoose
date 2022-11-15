const express = require("express");
const Course = require("../model/courses");
const router = express.Router();

router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
});

router.get("/:id", async (req, res) => {
  // to get query params from the request
  // req.query
  const course = await Course.findById(req.params.id);
  res.send(course);
  //   res.send(`Request is made for following ${req.params.id}`);
});

router.put("/:id", async (req, res) => {
  // two approaches to update the document

  //1. Query First approach - findById and store in it object
  //Modify that object and update
  const { id, author, isPublished } = req.params;
  const course = Course.findById(id);

  if (!course) return res.send("Unable to update document");

  // course.isPublished = true;

  //updating object using the set method
  //instead of assigning value to individual props
  course.set({
    isPublished,
    author,
  });

  // 2. Update First Approach
  //   const result = await Course.updateOne({_id: id}, {
  //     $set: {
  //         author,
  //         isPublished
  //     }
  //   })

  await course.save();
  res.send(course);
});

router.post("/", async (req, res) => {
  try {
    const course = new Course({
      name: req.body.name,
      author: req.body.author,
      tags: req.body.tags,
      isPublished: req.body.isPublished,
    });

    await course.save();
    res.send(course);
  } catch (err) {
    res.send("failed" + err.message);
  }

  //   const schema = {
  //     name: Joi.string().min(3).required,
  //   };

  //   const result = schema.validate(req.body);
  //   console.log(result);

  //   if (result.error) {
  //     res.send("Name is required");
  //   }

  //   const course = {
  //     id: 1,
  //     name: req.body.name,
  //   };

  //   res.send(course);
});

router.delete("/:id", async (req, res) => {
  try {
    const courseExists = await Course.findById(req.params.id);
    if (!courseExists) {
      throw new Error("Invalid id provided");
    }

    const course = await Course.findByIdAndDelete(req.params.id);
    res.send(course);
  } catch (err) {
    res.send(`Failed to delete - ${err.message}`);
  }
});

module.exports = router;
