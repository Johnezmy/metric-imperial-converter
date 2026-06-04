const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  suite('Function convertHandler.getNum(input)', function() {
    test('Whole number input', function(done) {
      assert.equal(convertHandler.getNum('32L'), 32);
      done();
    });
    test('Decimal number input', function(done) {
      assert.equal(convertHandler.getNum('3.25gal'), 3.25);
      done();
    });
    test('Fractional input', function(done) {
      assert.equal(convertHandler.getNum('1/2km'), 0.5);
      done();
    });
    test('Fractional input with a decimal', function(done) {
      assert.equal(convertHandler.getNum('2.5/5lbs'), 0.5);
      done();
    });
    test('Error on a double-fraction', function(done) {
      assert.isNull(convertHandler.getNum('3/2/3km'));
      done();
    });
    test('Default to 1 when no numerical input is provided', function(done) {
      assert.equal(convertHandler.getNum('kg'), 1);
      done();
    });
  });

  suite('Function convertHandler.getUnit(input)', function() {
    test('Read each valid input unit', function(done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      const output = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      input.forEach((ele, index) => {
        assert.equal(convertHandler.getUnit(ele), output[index]);
      });
      done();
    });
    test('Error for an invalid input unit', function(done) {
      assert.isNull(convertHandler.getUnit('32g'));
      done();
    });
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    test('Return the correct return unit for each valid input unit', function(done) {
      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const output = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach((ele, index) => {
        assert.equal(convertHandler.getReturnUnit(ele), output[index]);
      });
      done();
    });
  });

  suite('Function convertHandler.spellOutUnit(unit)', function() {
    test('Correct spelled-out string unit for each valid input unit', function(done) {
      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const output = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach((ele, index) => {
        assert.equal(convertHandler.spellOutUnit(ele), output[index]);
      });
      done();
    });
  });

  suite('Function convertHandler.convert(num, unit)', function() {
    test('Convert gal to L', function(done) {
      assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
      done();
    });
    test('Convert L to gal', function(done) {
      assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
      done();
    });
    test('Convert mi to km', function(done) {
      assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
      done();
    });
    test('Convert km to mi', function(done) {
      assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
      done();
    });
    test('Convert lbs to kg', function(done) {
      assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.1);
      done();
    });
    test('Convert kg to lbs', function(done) {
      assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
      done();
    });
  });

});