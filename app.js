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
require('./src/middleweare/passport')(passport);


const authRoutes = require('./src/routes/auth');
const groupRoutes = require('./src/routes/group');

app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);

module.exports = app;