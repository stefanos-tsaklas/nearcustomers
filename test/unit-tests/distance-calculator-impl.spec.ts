import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';
import DistanceCalculatorImpl from '../../src/distance/distance-calculator-impl';

chai.use(chaiSpies);
const expect = chai.expect;

describe('DistanceCalculatorImpl unit test suite', () => {

    const locations = {
        'prague':           { latitude: +50.0755381, longitude:  +14.4378005 },
        'brasil':           { latitude: -23.5337730, longitude:  -46.6252900 },
        'california':       { latitude: +36.7782610, longitude: -119.4179324 },
        'south_africa':     { latitude: -26.1952460, longitude:  +28.0340880 },
        'dublin':           { latitude: +53.3394280, longitude:   -6.2576640 },
        'point_(-90,-180)': { latitude: -90.0000000, longitude: -180.0000000 },
        'point_(-90,0)':    { latitude: -90.0000000, longitude:    0.0000000 },
        'point_(-90,+180)': { latitude: -90.0000000, longitude: +180.0000000 },
        'point_(0,-180)':   { latitude:   0.0000000, longitude: -180.0000000 },
        'point_(0,0)':      { latitude:   0.0000000, longitude:    0.0000000 },
        'point_(0,+180)':   { latitude:   0.0000000, longitude: +180.0000000 },
        'point_(+90,-180)': { latitude: +90.0000000, longitude: -180.0000000 },
        'point_(+90,0)':    { latitude: +90.0000000, longitude:    0.0000000 },
        'point_(+90,+180)': { latitude: +90.0000000, longitude: +180.0000000 },
    };

    // expected distances calculated by https://gps-coordinates.org/distance-between-coordinates.php
    const citiesTestCases = [
        { point1: locations.prague, point2: locations.prague, expected: 0 },
        { point1: locations.prague, point2: locations.brasil, expected: 10144.64 },
        { point1: locations.prague, point2: locations.california, expected: 9349.68 },
        { point1: locations.prague, point2: locations.south_africa, expected: 8586.55 },
        { point1: locations.prague, point2: locations.dublin, expected: 1465.74 },

        { point1: locations.brasil, point2: locations.prague, expected: 10144.64 },
        { point1: locations.brasil, point2: locations.brasil, expected: 0 },
        { point1: locations.brasil, point2: locations.california, expected: 10146.59 },
        { point1: locations.brasil, point2: locations.south_africa, expected: 7428.11 },
        { point1: locations.brasil, point2: locations.dublin, expected: 9390.05 },

        { point1: locations.california, point2: locations.prague, expected: 9350.13 },
        { point1: locations.california, point2: locations.brasil, expected: 10146.59 },
        { point1: locations.california, point2: locations.california, expected: 0 },
        { point1: locations.california, point2: locations.south_africa, expected: 16731.69  },
        { point1: locations.california, point2: locations.dublin, expected: 8118.41 },

        { point1: locations.south_africa, point2: locations.prague, expected: 8586.55 },
        { point1: locations.south_africa, point2: locations.brasil, expected: 7428.11 },
        { point1: locations.south_africa, point2: locations.california, expected: 16731.69 },
        { point1: locations.south_africa, point2: locations.south_africa, expected: 0 },
        { point1: locations.south_africa, point2: locations.dublin, expected: 9442.87 },

        { point1: locations.dublin, point2: locations.prague, expected: 1465.74 },
        { point1: locations.dublin, point2: locations.brasil, expected: 9390.05 },
        { point1: locations.dublin, point2: locations.california, expected: 8118.41 },
        { point1: locations.dublin, point2: locations.south_africa, expected: 9442.87 },
        { point1: locations.dublin, point2: locations.dublin, expected: 0 },
    ];

    const extremeTestCases = [
        { point1: locations['point_(-90,-180)'], point2: locations['point_(+90,-180)'], expected: 20015.09 },
        { point1: locations['point_(-90,-180)'], point2: locations['point_(+90,0)'], expected: 20015.09 },
        { point1: locations['point_(-90,-180)'], point2: locations['point_(+90,+180)'], expected: 20015.09 },
        { point1: locations['point_(-90,-180)'], point2: locations['point_(-90,-180)'], expected: 0 },
        { point1: locations['point_(-90,-180)'], point2: locations['point_(-90,0)'], expected: 0 },
        { point1: locations['point_(-90,-180)'], point2: locations['point_(-90,+180)'], expected: 0 },
        { point1: locations['point_(-90,-180)'], point2: locations['point_(0,-180)'], expected: 10007.54 },
        { point1: locations['point_(-90,-180)'], point2: locations['point_(0,0)'], expected: 10007.54 },
        { point1: locations['point_(-90,-180)'], point2: locations['point_(0,+180)'], expected: 10007.54 },

        { point1: locations['point_(-90,0)'], point2: locations['point_(+90,-180)'], expected: 20015.09 },
        { point1: locations['point_(-90,0)'], point2: locations['point_(+90,0)'], expected: 20015.09 },
        { point1: locations['point_(-90,0)'], point2: locations['point_(+90,+180)'], expected: 20015.09 },
        { point1: locations['point_(-90,0)'], point2: locations['point_(-90,-180)'], expected: 0 },
        { point1: locations['point_(-90,0)'], point2: locations['point_(-90,0)'], expected: 0 },
        { point1: locations['point_(-90,0)'], point2: locations['point_(-90,+180)'], expected: 0 },
        { point1: locations['point_(-90,0)'], point2: locations['point_(0,-180)'], expected: 10007.54 },
        { point1: locations['point_(-90,0)'], point2: locations['point_(0,0)'], expected: 10007.54 },
        { point1: locations['point_(-90,0)'], point2: locations['point_(0,+180)'], expected: 10007.54 },

        { point1: locations['point_(-90,+180)'], point2: locations['point_(+90,-180)'], expected: 20015.09 },
        { point1: locations['point_(-90,+180)'], point2: locations['point_(+90,0)'], expected: 20015.09 },
        { point1: locations['point_(-90,+180)'], point2: locations['point_(+90,+180)'], expected: 20015.09 },
        { point1: locations['point_(-90,+180)'], point2: locations['point_(-90,-180)'], expected: 0 },
        { point1: locations['point_(-90,+180)'], point2: locations['point_(-90,0)'], expected: 0 },
        { point1: locations['point_(-90,+180)'], point2: locations['point_(-90,+180)'], expected: 0 },
        { point1: locations['point_(-90,+180)'], point2: locations['point_(0,-180)'], expected: 10007.54 },
        { point1: locations['point_(-90,+180)'], point2: locations['point_(0,0)'], expected: 10007.54 },
        { point1: locations['point_(-90,+180)'], point2: locations['point_(0,+180)'], expected: 10007.54 },

        { point1: locations['point_(0,-180)'], point2: locations['point_(+90,-180)'], expected: 10007.54 },
        { point1: locations['point_(0,-180)'], point2: locations['point_(+90,0)'], expected: 10007.54 },
        { point1: locations['point_(0,-180)'], point2: locations['point_(+90,+180)'], expected: 10007.54 },
        { point1: locations['point_(0,-180)'], point2: locations['point_(-90,-180)'], expected: 10007.54 },
        { point1: locations['point_(0,-180)'], point2: locations['point_(-90,0)'], expected: 10007.54 },
        { point1: locations['point_(0,-180)'], point2: locations['point_(-90,+180)'], expected: 10007.54 },
        { point1: locations['point_(0,-180)'], point2: locations['point_(0,-180)'], expected: 0 },
        { point1: locations['point_(0,-180)'], point2: locations['point_(0,0)'], expected: 20015.09 },
        { point1: locations['point_(0,-180)'], point2: locations['point_(0,+180)'], expected: 0 },

        { point1: locations['point_(0,0)'], point2: locations['point_(+90,-180)'], expected: 10007.54 },
        { point1: locations['point_(0,0)'], point2: locations['point_(+90,0)'], expected: 10007.54 },
        { point1: locations['point_(0,0)'], point2: locations['point_(+90,+180)'], expected: 10007.54 },
        { point1: locations['point_(0,0)'], point2: locations['point_(-90,-180)'], expected: 10007.54 },
        { point1: locations['point_(0,0)'], point2: locations['point_(-90,0)'], expected: 10007.54 },
        { point1: locations['point_(0,0)'], point2: locations['point_(-90,+180)'], expected: 10007.54 },
        { point1: locations['point_(0,0)'], point2: locations['point_(0,-180)'], expected: 20015.09 },
        { point1: locations['point_(0,0)'], point2: locations['point_(0,0)'], expected: 0 },
        { point1: locations['point_(0,0)'], point2: locations['point_(0,+180)'], expected: 20015.09 },

        { point1: locations['point_(0,+180)'], point2: locations['point_(+90,-180)'], expected: 10007.54 },
        { point1: locations['point_(0,+180)'], point2: locations['point_(+90,0)'], expected: 10007.54 },
        { point1: locations['point_(0,+180)'], point2: locations['point_(+90,+180)'], expected: 10007.54 },
        { point1: locations['point_(0,+180)'], point2: locations['point_(-90,-180)'], expected: 10007.54 },
        { point1: locations['point_(0,+180)'], point2: locations['point_(-90,0)'], expected: 10007.54 },
        { point1: locations['point_(0,+180)'], point2: locations['point_(-90,+180)'], expected: 10007.54 },
        { point1: locations['point_(0,+180)'], point2: locations['point_(0,-180)'], expected: 0 },
        { point1: locations['point_(0,+180)'], point2: locations['point_(0,0)'], expected: 20015.09 },
        { point1: locations['point_(0,+180)'], point2: locations['point_(0,+180)'], expected: 0 },

        { point1: locations['point_(+90,-180)'], point2: locations['point_(+90,-180)'], expected: 0 },
        { point1: locations['point_(+90,-180)'], point2: locations['point_(+90,0)'], expected: 0 },
        { point1: locations['point_(+90,-180)'], point2: locations['point_(+90,+180)'], expected: 0 },
        { point1: locations['point_(+90,-180)'], point2: locations['point_(-90,-180)'], expected: 20015.09 },
        { point1: locations['point_(+90,-180)'], point2: locations['point_(-90,0)'], expected: 20015.09 },
        { point1: locations['point_(+90,-180)'], point2: locations['point_(-90,+180)'], expected: 20015.09 },
        { point1: locations['point_(+90,-180)'], point2: locations['point_(0,-180)'], expected: 10007.54 },
        { point1: locations['point_(+90,-180)'], point2: locations['point_(0,0)'], expected: 10007.54 },
        { point1: locations['point_(+90,-180)'], point2: locations['point_(0,+180)'], expected: 10007.54 },

        { point1: locations['point_(+90,0)'], point2: locations['point_(+90,-180)'], expected: 0 },
        { point1: locations['point_(+90,0)'], point2: locations['point_(+90,0)'], expected: 0 },
        { point1: locations['point_(+90,0)'], point2: locations['point_(+90,+180)'], expected: 0 },
        { point1: locations['point_(+90,0)'], point2: locations['point_(-90,-180)'], expected: 20015.09 },
        { point1: locations['point_(+90,0)'], point2: locations['point_(-90,0)'], expected: 20015.09 },
        { point1: locations['point_(+90,0)'], point2: locations['point_(-90,+180)'], expected: 20015.09 },
        { point1: locations['point_(+90,0)'], point2: locations['point_(0,-180)'], expected: 10007.54 },
        { point1: locations['point_(+90,0)'], point2: locations['point_(0,0)'], expected: 10007.54 },
        { point1: locations['point_(+90,0)'], point2: locations['point_(0,+180)'], expected: 10007.54 },

        { point1: locations['point_(+90,+180)'], point2: locations['point_(+90,-180)'], expected: 0 },
        { point1: locations['point_(+90,+180)'], point2: locations['point_(+90,0)'], expected: 0 },
        { point1: locations['point_(+90,+180)'], point2: locations['point_(+90,+180)'], expected: 0 },
        { point1: locations['point_(+90,+180)'], point2: locations['point_(-90,-180)'], expected: 20015.09 },
        { point1: locations['point_(+90,+180)'], point2: locations['point_(-90,0)'], expected: 20015.09 },
        { point1: locations['point_(+90,+180)'], point2: locations['point_(-90,+180)'], expected: 20015.09 },
        { point1: locations['point_(+90,+180)'], point2: locations['point_(0,-180)'], expected: 10007.54 },
        { point1: locations['point_(+90,+180)'], point2: locations['point_(0,0)'], expected: 10007.54 },
        { point1: locations['point_(+90,+180)'], point2: locations['point_(0,+180)'], expected: 10007.54 },
    ];

    const conversionTestCases = [
        { degrees: -360, expectedRadians: -6.28319 },
        { degrees: -270, expectedRadians: -4.71239 },
        { degrees: -180, expectedRadians: -3.14159 },
        { degrees: -90, expectedRadians: -1.5708 },
        { degrees: 0, expectedRadians: 0 },
        { degrees: 90, expectedRadians: 1.5708 },
        { degrees: 180, expectedRadians: 3.14159 },
        { degrees: 270, expectedRadians: 4.71239 },
        { degrees: 360, expectedRadians: 6.28319 },
    ];

    citiesTestCases.forEach((testCase) => {

        it(`correctly calculates distance between cities at ${JSON.stringify(testCase.point1)} and ${JSON.stringify(testCase.point2)} as ${testCase.expected}`, function() {

            // arrange
            let calculator = new DistanceCalculatorImpl();

            // act
            let result = calculator.GetDistanceInKilometers(testCase.point1, testCase.point2);

            // assert distance with tolerance of 1 kilometer
            expect(result).to.be.closeTo(testCase.expected, 1);
        });
    });

    extremeTestCases.forEach((testCase) => {

        it(`correctly calculates distance between extreme points ${JSON.stringify(testCase.point1)} and ${JSON.stringify(testCase.point2)} as ${testCase.expected}`, function() {

            // arrange
            let calculator = new DistanceCalculatorImpl();

            // act
            let result = calculator.GetDistanceInKilometers(testCase.point1, testCase.point2);

            // assert distance with tolerance of 1 kilometer
            expect(result).to.be.closeTo(testCase.expected, 1);
        });
    });

    conversionTestCases.forEach((testCase) => {
        
        it(`correctly convert ${testCase.degrees} degrees to ${testCase.expectedRadians} radians`, () => {

            // arrange
            let calculator = new DistanceCalculatorImpl();

            // act
            let result = calculator.FromDegreesToRadians(testCase.degrees);

            // assert
            expect(result).to.be.closeTo(testCase.expectedRadians, 0.1);
        });
    });
});