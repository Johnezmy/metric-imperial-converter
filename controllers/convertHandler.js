function ConvertHandler() {
  
  // Helper to split number string away from the unit string
  const splitInput = (input) => {
    // Locate the first alphabetic character index
    const firstLetterMatch = input.match(/[a-zA-Z]/);
    if (!firstLetterMatch) return [input, ""];
    const index = firstLetterMatch.index;
    return [input.slice(0, index), input.slice(index)];
  };

  this.getNum = function(input) {
    let [numStr] = splitInput(input);
    
    // Condition: Default to 1 if no number is provided (e.g., 'kg')
    if (numStr === "") return 1;

    // Condition: Check for invalid double fractions (e.g., '3/2/3')
    const fractionCount = (numStr.match(/\//g) || []).length;
    if (fractionCount > 1) return null;

    // Handle valid fractions (e.g., '1/2' or '2.5/5')
    if (fractionCount === 1) {
      const splitFraction = numStr.split('/');
      const num = parseFloat(splitFraction[0]);
      const den = parseFloat(splitFraction[1]);
      if (isNaN(num) || isNaN(den) || den === 0) return null;
      return num / den;
    }

    // Handle normal whole numbers and decimals
    const result = parseFloat(numStr);
    return isNaN(result) ? null : result;
  };
  
  this.getUnit = function(input) {
    let [_, unitStr] = splitInput(input);
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const lowerUnit = unitStr.toLowerCase();
    
    if (!validUnits.includes(lowerUnit)) return null;
    
    // Rule: return uppercase 'L' for liters, lowercase for everything else
    return lowerUnit === 'l' ? 'L' : lowerUnit;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMapping = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitMapping[initUnit] || null;
  };

  this.spellOutUnit = function(unit) {
    const spellMapping = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return spellMapping[unit] || null;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch (initUnit) {
      case 'gal': result = initNum * galToL; break;
      case 'L': result = initNum / galToL; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'kg': result = initNum / lbsToKg; break;
      case 'mi': result = initNum * miToKm; break;
      case 'km': result = initNum / miToKm; break;
      default: return null;
    }
    
    // Round to exactly 5 decimal places
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;