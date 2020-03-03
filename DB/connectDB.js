const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/data', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;
 
const BlogPost = new Schema({
  avatar: String,
  name: String,
  email: String
},{
  collection: "user"
});
const Post = mongoose.model('user',BlogPost);

module.exports= Post;