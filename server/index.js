require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);
const authRoutes = require('./routes/auth.route.js');
const clinicalTrialRoutes = require('./routes/clinicalTrials.route.js');

const app = express();

app.use(express.json());
app.use(cors({ 
  origin: 'http://localhost:3000', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(session({ 
  secret: process.env.SESSION_SECRET || 'clinical_trial_secret', 
  resave: false, 
  saveUninitialized: false,
  cookie: { 
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  name: 'sessionId' 
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/clinical_trials')
.then(() => {
  console.log('✅ MongoDB connected successfully');
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
});

app.get('/', (req, res) => {
  res.send('Clinical Trial Management API');
});

app.use('/api/auth', authRoutes);
app.use('/api/trials', clinicalTrialRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
