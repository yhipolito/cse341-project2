const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET: Retrieve all fleet helicopters
const getAllHelicopters = async (req, res) => {
  const lists = await mongodb.getDatabase().db().collection('helicopters').find().toArray();
  
  if (lists) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } else {
    res.status(500).json('Some error occurred while retrieving helicopters.');
  }
};

// POST: Insert a new fleet helicopter (Now with 8 fields!)
const createHelicopter = async (req, res) => {
  const helicopter = {
    tailNumber: req.body.tailNumber,                  // Field 1
    modelName: req.body.modelName,                    // Field 2
    manufacturer: req.body.manufacturer,              // Field 3 (New)
    yearManufactured: req.body.yearManufactured,      // Field 4 (New)
    useType: req.body.useType,                        // Field 5
    passengerCapacity: req.body.passengerCapacity,    // Field 6
    maxRangeNauticalMiles: req.body.maxRangeNauticalMiles, // Field 7 (New)
    assignedAirportId: new ObjectId(req.body.assignedAirportId) // Field 8
  };

  const response = await mongodb.getDatabase().db().collection('helicopters').insertOne(helicopter);
  
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while adding the helicopter.');
  }
};

// GET: Retrieve a single helicopter by its ID
const getSingleHelicopter = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid helicopter id to find a helicopter.');
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
    res.status(404).json('Helicopter not found.');
  }
};

module.exports = {
  getAllHelicopters,
  createHelicopter,
  getSingleHelicopter // Added here
};
