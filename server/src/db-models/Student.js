const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    groupId: {
        ref: 'group',
        type: Schema.Types.ObjectId,
        required: true
    },
    studentTicket: {
        type: String,
        required: true
    },
    academicBook: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('student', studentSchema);