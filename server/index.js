const app = require("express")();
const port = 3000;
const { User, Campaign, getCampaignImg } = require("../db");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const serveStatic = require("serve-static");

app.use(session({ secret: "blah", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post("/login", (req, res) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      res.status(400).send("error");
    } else if (!user) {
      res.send("this is not a valid user");
    } else if (user.role === "admin") {
      res.send({
        user: user
      });
    } else {
      getCampaignImg(user).then(data => {
        res.send({
          img: data ? data.img_src : "shrug.jpg",
          user: user
        });
      });
    }
  })(req, res);
});

app.post("/logout", (req, res) => {
  req.logout();
  res.send("logged out");
});

app.listen(port, () => {
  console.log(`LISTENING: ${port}`);
});
