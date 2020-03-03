const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/datanew', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Schema = mongoose.Schema;

const BlogPost = new Schema({
  avatar: String,
  name: String
});
const Post = mongoose.model('users',BlogPost);

module.exports = Post;