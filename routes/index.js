const router = require('express').Router();
const airportsController = require('../controllers/airports');
const helicoptersController = require('../controllers/helicopters');
const validationGuard = require('../middleware/validate');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// --- Airports API Endpoints ---
router.get('/airports', airportsController.getAllAirports);
router.get('/airports/:id', airportsController.getSingleAirport); // Added
router.post('/airports', validationGuard.saveAirport, airportsController.createAirport);

// --- Helicopters API Endpoints ---
router.get('/helicopters', helicoptersController.getAllHelicopters);
router.get('/helicopters/:id', helicoptersController.getSingleHelicopter); // Added
router.post('/helicopters', validationGuard.saveHelicopter, helicoptersController.createHelicopter);

module.exports = router;
