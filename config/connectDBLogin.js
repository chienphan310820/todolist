const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dangnhap', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const Schema = mongoose.Schema;

const personSchema = new Schema({
    email: String,
    password: String,
    type: {
        type: String,
        default: 1
    }
});

module.exports =  personSchema 