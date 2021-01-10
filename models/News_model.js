const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NewsSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    category:{type: String, required: true},
    featured : {type:String},
    desc:{type: String, required: true},
    thumbnail:{type: String, required: true},
});

// Export the model
module.exports = mongoose.model('News', NewsSchema);