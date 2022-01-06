const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const sciencePerformanceSchema = new Schema({
    scienceId: {
        ref: 'science',
        type: Schema.Types.ObjectId,
        required: true
    },
    academicPerformances: [
        {
            ref: 'academicPerformance',
            type: Schema.Types.ObjectId,
            required: true
        }
    ],
})

module.exports = mongoose.model('sciencePerformance', sciencePerformanceSchema);