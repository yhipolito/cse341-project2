const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Utah Aviation Operations API',
    description: 'CSE 341 - Project 2: Airports & Helicopters Fleet Tracker with 8-field payload validations.'
  },
  host: 'cse341-project2-dj7y.onrender.com',
  schemes: ['https', 'http'],
  definitions: {
    AirportInput: {
      airportName: "South Valley Regional Airport",
      airportCode: "U42",
      cityLocation: "West Jordan",
      helipadsAvailable: 2,
      providesJetFuel: true
    },
    HelicopterInput: {
      tailNumber: "N123UT",
      modelName: "AS350 B3",
      manufacturer: "Airbus Helicopters",
      yearManufactured: 2022,
      useType: "Air Ambulance",
      passengerCapacity: 5,
      maxRangeNauticalMiles: 350,
      assignedAirportId: "652f4c9c1b3d5e001f8a2b3c"
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// This script compiles your routes list and auto-generates swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
