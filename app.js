require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const connectDB = require('./config/db');

const app = express();


// =========================
// DATABASE CONNECTION
// =========================
connectDB();


// =========================
// PASSPORT CONFIG
// =========================
require('./config/passport')(passport);


// =========================
// BODY PARSER
// =========================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// =========================
// METHOD OVERRIDE
// =========================
app.use(methodOverride('_method'));


// =========================
// STATIC FILES
// =========================
app.use(express.static('public'));


// =========================
// EJS LAYOUTS
// =========================
app.use(expressLayouts);
app.set('layout', './layouts/layout');
app.set('view engine', 'ejs');


// =========================
// EXPRESS SESSION
// =========================
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'foodboardsecret',
    resave: false,
    saveUninitialized: false,
  })
);


// =========================
// PASSPORT MIDDLEWARE
// =========================
app.use(passport.initialize());
app.use(passport.session());


// =========================
// FLASH MESSAGES
// =========================
app.use(flash());


// =========================
// GLOBAL VARIABLES
// =========================
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});


// =========================
// ROUTES
// =========================
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/foodRoutes'));
app.use('/', require('./routes/externalFoodRoutes'));
app.use('/api', require('./routes/apiRoutes'));


// =========================
// 404 PAGE
// =========================
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});


// =========================
// SERVER
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});