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
router.get('/airports/:id', airportsController.getSingleAirport);
router.post('/airports', validationGuard.saveAirport, airportsController.createAirport);
router.put('/airports/:id', validationGuard.saveAirport, airportsController.updateAirport); // Added with validation
router.delete('/airports/:id', airportsController.deleteAirport); // Added

// --- Helicopters API Endpoints ---
router.get('/helicopters', helicoptersController.getAllHelicopters);
router.get('/helicopters/:id', helicoptersController.getSingleHelicopter);
router.post('/helicopters', validationGuard.saveHelicopter, helicoptersController.createHelicopter);
router.put('/helicopters/:id', validationGuard.saveHelicopter, helicoptersController.updateHelicopter); // Added with validation
router.delete('/helicopters/:id', helicoptersController.deleteHelicopter); // Added

module.exports = router;
