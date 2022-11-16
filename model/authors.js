const { default: mongoose } = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

exports.Author = Author;
exports.authorSchema = authorSchema;
// module.exports = {Author, authorSchema}
