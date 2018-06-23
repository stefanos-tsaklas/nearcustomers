import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';
import Coordinate from '../../src/model/Coordinate';
import DistanceCalculatorImpl from '../../src/distance/distance-calculator-impl';

chai.use(chaiSpies);

const expect = chai.expect;

describe('DistanceCalculatorImpl test suite', () => {
    const locations = {
        "prague":       { longitude: 14.4378005, latitude: 50.0755381 },
        "california":   { longitude: -119.4179324, latitude: 36.778261 }
    };

    const tests = [
        { args: [ locations.prague, locations.prague ], expected: 0 },
        { args: [ locations.prague, locations.california ], expected: 9349.68 },
        { args: [ locations.california, locations.prague ], expected: 9349.68 },
    ];

    tests.forEach(function(test) {
        it(`correctly calculates distance between ${JSON.stringify(test.args[0])} and ${JSON.stringify(test.args[1])} as ${test.expected}`, function() {

            // arrange
            let calculator = new DistanceCalculatorImpl();

            // act
            let result = calculator.GetDistanceInKilometers(test.args[0], test.args[1]);

            // assert
            expect(result).to.be.closeTo(test.expected, 1);
        });
    });
});
