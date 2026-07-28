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

module.exports = {
  getAllAirports,
  createAirport
};
