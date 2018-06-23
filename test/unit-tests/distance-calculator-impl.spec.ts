import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';
import Coordinate from '../../src/model/Coordinate';
import DistanceCalculatorImpl from '../../src/distance/distance-calculator-impl';

chai.use(chaiSpies);

const expect = chai.expect;

//latitude: [-90, 0, +90] longitude: [-180, 0, 180 ]
describe('DistanceCalculatorImpl test suite', () => {
    const locations = {
        "prague":           { latitude: +50.0755381, longitude:  +14.4378005 },
        "brasil":           { latitude: -23.5337730, longitude:  -46.6252900 },
        "california":       { latitude: +36.7782610, longitude: -119.4179324 },
        "south_africa":     { latitude: -26.1952460, longitude:  +28.0340880 },
        "dublin":           { latitude: +53.3394280, longitude:   -6.2576640 },
        "point_(-90,-180)": { latitude: -90.0000000, longitude: -180.0000000 },
        "point_(-90,0)":    { latitude: -90.0000000, longitude:    0.0000000 },
        "point_(-90,+180)": { latitude: -90.0000000, longitude: +180.0000000 },
        "point_(0,-180)":   { latitude:   0.0000000, longitude: -180.0000000 },
        "point_(0,0)":      { latitude:   0.0000000, longitude:    0.0000000 },
        "point_(0,+180)":   { latitude:   0.0000000, longitude: +180.0000000 },
        "point_(+90,-180)": { latitude: +90.0000000, longitude: -180.0000000 },
        "point_(+90,0)":    { latitude: +90.0000000, longitude:    0.0000000 },
        "point_(+90,+180)": { latitude: +90.0000000, longitude: +180.0000000 },
    };
    
    // expected distances calculated by https://gps-coordinates.org/distance-between-coordinates.php
    const citiesTests = [
        { point1: locations.prague, point2: locations.prague, expected: 0 },
        { point1: locations.prague, point2: locations.california, expected: 9349.68 },
        { point1: locations.prague, point2: locations.brasil, expected: 10144.64 },
        { point1: locations.california, point2: locations.prague, expected: 9349.68 },
        { point1: locations.california, point2: locations.brasil, expected: 10146.59 },
    ];
    const extremeTests = [
        { point1: locations["point_(-90,-180)"], point2: locations["point_(+90,-180)"], expected: 20015.09 },
        { point1: locations["point_(-90,-180)"], point2: locations["point_(+90,0)"], expected: 20015.09 },
        { point1: locations["point_(-90,-180)"], point2: locations["point_(+90,+180)"], expected: 20015.09 },
        { point1: locations["point_(-90,-180)"], point2: locations["point_(-90,-180)"], expected: 0 },
        { point1: locations["point_(-90,-180)"], point2: locations["point_(-90,0)"], expected: 0 },
        { point1: locations["point_(-90,-180)"], point2: locations["point_(-90,+180)"], expected: 0 },
        { point1: locations["point_(-90,-180)"], point2: locations["point_(0,-180)"], expected: 10007.54 },
        { point1: locations["point_(-90,-180)"], point2: locations["point_(0,0)"], expected: 10007.54 },
        { point1: locations["point_(-90,-180)"], point2: locations["point_(0,+180)"], expected: 10007.54 },
    ];

    citiesTests.forEach(function(test) {
        it(`correctly calculates distance between cities at ${JSON.stringify(test.point1)} and ${JSON.stringify(test.point2)} as ${test.expected}`, function() {

            // arrange
            let calculator = new DistanceCalculatorImpl();

            // act
            let result = calculator.GetDistanceInKilometers(test.point1, test.point2);

            // assert distance with tolerance of 1 kilometer
            expect(result).to.be.closeTo(test.expected, 1);
        });
    });

    extremeTests.forEach(function(test) {
        it(`correctly calculates distance between cities at ${JSON.stringify(test.point1)} and ${JSON.stringify(test.point2)} as ${test.expected}`, function() {

            // arrange
            let calculator = new DistanceCalculatorImpl();

            // act
            let result = calculator.GetDistanceInKilometers(test.point1, test.point2);

            // assert distance with tolerance of 1 kilometer
            expect(result).to.be.closeTo(test.expected, 1);
        });
    });
});
