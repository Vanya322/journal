const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    sciencePerformances: [
        {
            ref: 'sciencePerformance',
            type: Schema.Types.ObjectId,
            required: true
        }
    ]
})

module.exports = mongoose.model('groupHistory', groupSchema);