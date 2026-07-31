const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET: Retrieve all fleet helicopters
const getAllHelicopters = async (req, res) => {
  try {
    const lists = await mongodb.getDatabase().db().collection('helicopters').find().toArray();
    
    if (lists) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    } else {
      res.status(500).json({ message: 'Some error occurred while retrieving helicopters.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal Server Error while retrieving helicopters.' });
  }
};

// POST: Insert a new fleet helicopter (Now with 8 fields!)
const createHelicopter = async (req, res) => {
  try {
    // Validate that critical required fields are present in the request payload
    if (!req.body.tailNumber || !req.body.modelName || !req.body.assignedAirportId) {
      return res.status(400).json({ message: 'Bad Request: Missing required helicopter fields.' });
    }

    // Validate that the assigned airport ID is a legally formatted MongoDB ObjectId
    if (!ObjectId.isValid(req.body.assignedAirportId)) {
      return res.status(400).json({ message: 'Bad Request: assignedAirportId must be a valid MongoDB ID.' });
    }

    const helicopter = {
      tailNumber: req.body.tailNumber,                  // Field 1
      modelName: req.body.modelName,                    // Field 2
      manufacturer: req.body.manufacturer,              // Field 3
      yearManufactured: req.body.yearManufactured,      // Field 4
      useType: req.body.useType,                        // Field 5
      passengerCapacity: req.body.passengerCapacity,    // Field 6
      maxRangeNauticalMiles: req.body.maxRangeNauticalMiles, // Field 7
      assignedAirportId: new ObjectId(req.body.assignedAirportId) // Field 8
    };

    const response = await mongodb.getDatabase().db().collection('helicopters').insertOne(helicopter);
    
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Some error occurred while adding the helicopter.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal Server Error while adding the helicopter.' });
  }
};

// GET: Retrieve a single helicopter by its ID
const getSingleHelicopter = async (req, res) => {
  try {
    // Invalid IDs are a user input error, returning a 400 Bad Request
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid helicopter id to find a helicopter.' });
    }

    const helicopterId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('helicopters')
      .find({ _id: helicopterId })
      .toArray();

    if (result.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]); // Returns just the single object
    } else {
      res.status(404).json({ message: 'Helicopter not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal Server Error while retrieving the helicopter.' });
  }
};

// PUT: Update an existing helicopter (Enforcing all 8 fields)
const updateHelicopter = async (req, res) => {
  try {
    // Invalid main IDs mean a 400 Bad Request
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid helicopter id to update a helicopter.' });
    }

    // Validate that the assigned airport ID property inside the body is also format-valid
    if (!ObjectId.isValid(req.body.assignedAirportId)) {
      return res.status(400).json({ message: 'Bad Request: assignedAirportId must be a valid MongoDB ID.' });
    }

    const helicopterId = new ObjectId(req.params.id);
    const helicopter = {
      tailNumber: req.body.tailNumber,
      modelName: req.body.modelName,
      manufacturer: req.body.manufacturer,
      yearManufactured: req.body.yearManufactured,
      useType: req.body.useType,
      passengerCapacity: req.body.passengerCapacity,
      maxRangeNauticalMiles: req.body.maxRangeNauticalMiles,
      assignedAirportId: new ObjectId(req.body.assignedAirportId)
    };

    const response = await mongodb.getDatabase().db().collection('helicopters').replaceOne({ _id: helicopterId }, helicopter);
    
    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while updating the helicopter.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal Server Error while updating the helicopter.' });
  }
};

// DELETE: Remove a helicopter
const deleteHelicopter = async (req, res) => {
  try {
    // Invalid IDs mean a 400 Bad Request
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid helicopter id to delete a helicopter.' });
    }
    
    const helicopterId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('helicopters').deleteOne({ _id: helicopterId });
    
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while deleting the helicopter.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Internal Server Error while deleting the helicopter.' });
  }
};

module.exports = {
  getAllHelicopters,
  createHelicopter,
  getSingleHelicopter,
  updateHelicopter,
  deleteHelicopter
};
