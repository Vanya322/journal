const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport')

const keys = require('./src/config/keys');

mongoose.connect(keys.mongoURL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => console.log(err));

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(passport.initialize());
const myPassport = require('./src/middleweare/passport');
myPassport(passport);

const authRoutes = require('./src/routes/auth');
const groupRoutes = require('./src/routes/group');
const sciencePerformanceRoutes = require('./src/routes/sciencePerformance');
const academicPerformanceRoutes = require('./src/routes/academicPerformance');
const scienceRoutes = require("./src/routes/science")
const studentRoutes = require("./src/routes/student")

app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/sciencePerformances', sciencePerformanceRoutes);
app.use('/api/academicPerformances', academicPerformanceRoutes);
app.use('/api/sciences', scienceRoutes);
app.use('/api/students', studentRoutes);

module.exports = app;