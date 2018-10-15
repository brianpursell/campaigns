const app = require("express")();
const port = 3000;
const User = require('../db');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({ secret: 'blah', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

app.get('/', (req, res) => {
  console.log(req.user)
  res.send('success')
});

app.get('/login', (req, res) => {
  res.send('fail');
})

app.listen(port, () => {
  console.log(`LISTENING: ${port}`);
});
