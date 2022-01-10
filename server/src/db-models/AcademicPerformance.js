const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const academicPerformanceSchema = new Schema({
    sciencePerformanceId: {
        ref: 'sciencePerformance',
        type: Schema.Types.ObjectId,
        required: true
    },
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
})

module.exports = mongoose.model('academicPerformance', academicPerformanceSchema);