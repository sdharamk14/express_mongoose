const { default: mongoose } = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/,
    lowercase: true,
    // uppercase: true,
    trim: true,
  },
  author: { type: mongoose.SchemaTypes.ObjectId, ref: "Author" },
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "A course should have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
//   price: {
//     type: Number,
//     min: 10,
//     max: 200,
//     required: function () {
//       return this.isPublished;
//     },
//     get: (v) => Math.round(v),
//     set: (v) => Math.round(v),
//   },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
