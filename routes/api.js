'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  // Define the GET endpoint the frontend form is looking for
  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    
    // Fallback if no input parameter exists at all
    if (!input) {
      return res.status(400).send('invalid input');
    }

    // Pass the input to our engine functions
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    // Explicit error condition handling according to user stories
    if (initNum === null && initUnit === null) {
      return res.send('invalid number and unit');
    }
    if (initNum === null) {
      return res.send('invalid number');
    }
    if (initUnit === null) {
      return res.send('invalid unit');
    }

    // If input is perfectly valid, execute calculations
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    // Send back the clean JSON payload the frontend expects
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });

};