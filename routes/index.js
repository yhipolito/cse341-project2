const router = require('express').Router();
const passport = require('passport');
const airportsController = require('../controllers/airports');
const { isAuthenticated } = require("../middleware/authenticate");
const helicoptersController = require('../controllers/helicopters');
const validationGuard = require('../middleware/validate');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// --- Airports API Endpoints ---
router.get('/airports', airportsController.getAllAirports);
router.get('/airports/:id', airportsController.getSingleAirport);
router.post('/airports', isAuthenticated, validationGuard.saveAirport, airportsController.createAirport);
router.put('/airports/:id', isAuthenticated, validationGuard.saveAirport, airportsController.updateAirport); // Added with validation
router.delete('/airports/:id', isAuthenticated, airportsController.deleteAirport); // Added

// --- Helicopters API Endpoints ---
router.get('/helicopters', helicoptersController.getAllHelicopters);
router.get('/helicopters/:id', helicoptersController.getSingleHelicopter);
router.post('/helicopters', isAuthenticated, validationGuard.saveHelicopter, helicoptersController.createHelicopter);
router.put('/helicopters/:id', isAuthenticated, validationGuard.saveHelicopter, helicoptersController.updateHelicopter); // Added with validation
router.delete('/helicopters/:id', isAuthenticated, helicoptersController.deleteHelicopter); // Added

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
