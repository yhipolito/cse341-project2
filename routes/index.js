const router = require('express').Router();
const passport = require('passport');

// Swagger UI Configuration
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument, {
  swaggerOptions: {
    withCredentials: true
  }
}));

// --- Mount Separated Resource Sub-Routers ---
router.use('/airports', require('./airports'));
router.use('/helicopters', require('./helicopters'));

// --- Authentication & Identity Flows ---
router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// HOME ROUTE: Dynamic login landing status check
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Logged In as ${req.user.displayName || req.user.username}`);
  } else {
    res.send('Logged Out');
  }
});

// CALLBACK ROUTE: Processes the code GitHub OAuth returns
router.get('/auth/github/callback', 
  passport.authenticate('github', { 
    failureRedirect: '/api-docs', 
    session: true 
  }),
  (req, res) => {
    res.redirect('/'); 
  }
);

module.exports = router;
