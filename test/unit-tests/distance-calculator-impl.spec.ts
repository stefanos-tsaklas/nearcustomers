import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';
import Coordinate from '../../src/model/Coordinate';
import DistanceCalculatorImpl from '../../src/distance/distance-calculator-impl';

chai.use(chaiSpies);

const should = chai.should(), expect = chai.expect;

const sandbox = chai.spy.sandbox();

describe('DistanceCalculatorImpl test suite', () => {

  it('calculates zero distance for the same two coordinates' , () => {

    // arrange
    let c1: Coordinate = { longitude: 23, latitude: 44 };
    let c2: Coordinate = { longitude: 23, latitude: 44 };
    let calculator = new DistanceCalculatorImpl();

    // act
    let result = calculator.GetDistanceInKilometers(c1, c2);

    // assert
    expect(result).to.be.equal(0);
  });
});
