const router = require('express').Router();
const helicoptersController = require('../controllers/helicopters');
const { isAuthenticated } = require("../middleware/authenticate");
const validationGuard = require('../middleware/validate');

// GET all helicopters
router.get('/', helicoptersController.getAllHelicopters);

// GET a single helicopter by ID
router.get('/:id', helicoptersController.getSingleHelicopter);

// POST a new helicopter (Protected by Auth & Validation)
router.post('/', isAuthenticated, validationGuard.saveHelicopter, helicoptersController.createHelicopter);

// PUT update an existing helicopter (Protected by Auth & Validation)
router.put('/:id', isAuthenticated, validationGuard.saveHelicopter, helicoptersController.updateHelicopter);

// DELETE a helicopter (Protected by Auth)
router.delete('/:id', isAuthenticated, helicoptersController.deleteHelicopter);

module.exports = router;
