const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const scienceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('science', scienceSchema);