const router = require('express').Router();
const airportsController = require('../controllers/airports');
const { isAuthenticated } = require("../middleware/authenticate");
const validationGuard = require('../middleware/validate');

// GET all airports
router.get('/', airportsController.getAllAirports);

// GET a single airport by ID
router.get('/:id', airportsController.getSingleAirport);

// POST a new airport (Protected by Auth & Validation)
router.post('/', isAuthenticated, validationGuard.saveAirport, airportsController.createAirport);

// PUT update an existing airport (Protected by Auth & Validation)
router.put('/:id', isAuthenticated, validationGuard.saveAirport, airportsController.updateAirport);

// DELETE an airport (Protected by Auth)
router.delete('/:id', isAuthenticated, airportsController.deleteAirport);

module.exports = router;
