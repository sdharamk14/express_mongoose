const { default: mongoose } = require("mongoose");
const { authorSchema } = require("./authors");

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: authorSchema,
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
