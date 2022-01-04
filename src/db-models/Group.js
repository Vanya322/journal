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
    groupSubjects: [
        {
            ref: 'groupSubject',
            type: Schema.Types.ObjectId,
            required: true
        }
    ]
})

module.exports = mongoose.model('group', groupSchema);