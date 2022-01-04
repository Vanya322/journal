const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const groupSubjectSchema = new Schema({
    subjectId: {
        ref: 'subject',
        type: Schema.Types.ObjectId,
        required: true
    },
    academicPerformances: [
        {
            studentId: {
                ref: 'student',
                type: Schema.Types.ObjectId,
                required: true
            },
            date: {
                type: String,
                required: true
            },
            performance: {
                type: String,
                required: true
            },
        },
    ],
})

module.exports = mongoose.model('groupSubject', groupSubjectSchema);