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

module.exports = {
  getAllHelicopters,
  createHelicopter
};
