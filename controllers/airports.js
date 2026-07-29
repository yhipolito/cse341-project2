const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET: Retrieve all airports
const getAllAirports = async (req, res) => {
  const lists = await mongodb.getDatabase().db().collection('airports').find().toArray();
  
  if (lists) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } else {
    res.status(500).json('Some error occurred while retrieving airports.');
  }
};

// POST: Add a new Utah aviation facility
const createAirport = async (req, res) => {
  const airport = {
    airportName: req.body.airportName,
    airportCode: req.body.airportCode,
    cityLocation: req.body.cityLocation,
    helipadsAvailable: req.body.helipadsAvailable,
    providesJetFuel: req.body.providesJetFuel
  };

  const response = await mongodb.getDatabase().db().collection('airports').insertOne(airport);
  
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the airport.');
  }
};

// GET: Retrieve a single airport by its ID
const getSingleAirport = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid airport id to find an airport.');
  }

  const airportId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('airports')
    .find({ _id: airportId })
    .toArray();

  if (result.length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]); // Returns just the single object
  } else {
    res.status(404).json('Airport not found.');
  }
};

// PUT: Update an existing airport
const updateAirport = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid airport id to update an airport.');
  }
  const airportId = new ObjectId(req.params.id);
  const airport = {
    airportName: req.body.airportName,
    airportCode: req.body.airportCode,
    cityLocation: req.body.cityLocation,
    helipadsAvailable: req.body.helipadsAvailable,
    providesJetFuel: req.body.providesJetFuel
  };

  const response = await mongodb.getDatabase().db().collection('airports').replaceOne({ _id: airportId }, airport);
  if (response.matchedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the airport.');
  }
};

// DELETE: Remove an airport
const deleteAirport = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid airport id to delete an airport.');
  }
  const airportId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('airports').deleteOne({ _id: airportId });
  
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the airport.');
  }
};

// Update your module.exports at the bottom to include them:
module.exports = {
  getAllAirports,
  createAirport,
  getSingleAirport,
  updateAirport,
  deleteAirport
};
