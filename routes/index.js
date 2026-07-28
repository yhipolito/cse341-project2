const router = require('express').Router();
const airportsController = require('../controllers/airports');
const helicoptersController = require('../controllers/helicopters');
const validationGuard = require('../middleware/validate');

// --- Airports API Endpoints ---
router.get('/airports', airportsController.getAllAirports);
router.post('/airports', validationGuard.saveAirport, airportsController.createAirport); // Protected by validator

// --- Helicopters API Endpoints ---
router.get('/helicopters', helicoptersController.getAllHelicopters);
router.post('/helicopters', validationGuard.saveHelicopter, helicoptersController.createHelicopter); // Protected by validator

module.exports = router;
