const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const router = require('./routes/index');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const GitHubStrategy = require("passport-github2").Strategy;
const { MongoStore } = require('connect-mongo');

const app = express();
const port = process.env.PORT || 3000;

// 2. MIDDLEWARES & PROXY SETTINGS
app.use(bodyParser.json());
app.set('trust proxy', 1); // Crucial for keeping you logged in on Render

// 3. UPDATED SESSION CONFIGURATION
app.use(session({
  secret: process.env.SESSION_SECRET || "secret", 
  resave: false,
  saveUninitialized: false, 
  store: MongoStore.create({
    // Make sure MONGODB_URI matches the key name in your Render Environment dashboard
    mongoUrl: process.env.MONGODB_URL, 
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: true,                // Required for HTTPS on Render
    sameSite: 'none'             // Allows cross-site cookie sharing for GitHub OAuth
  }
}));
// This is the basic express session({..}) initialization.
app.use(passport.initialize())
// init passport on every route call.
app.use(passport.session())
// allow passport to use "express-session".
app.use((req, res, next) => {
    res. setHeader("Acress-Controll-Allow-Origin", "*"); 
    res .setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
);
res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
next ();
})
app.use(cors({
  origin: 'https://onrender.com', // Explicitly allow your domain
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],  // Allowed methods (Note: "UPDATE" is not a real HTTP method)
  credentials: true                                    // CRITICAL: Allows session cookies to pass through
}));

app.use("/", require("./routes/index.js"));


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID, 
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshtoken, profile, done) {
    //User. findorCreate( githubId: profile.id }, function (err, user) {
        return done (null, profile);
    //});
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged Out"
  );
});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}), 
  (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and server running on port ${port}`);
    });
  }
});
