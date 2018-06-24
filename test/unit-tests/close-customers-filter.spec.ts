import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';
import CloseCustomersFilter from '../../src/filters/close-customers-filter';
import Customer from '../../src/model/customer';
import DistanceCalculatorImpl from '../../src/distance/distance-calculator-impl';

chai.use(chaiSpies);
const expect = chai.expect;

describe('CloseCustomersFilter test suite', () => {

    const MockDistanceInKilometersMethod = function(nearCustomers: Customer[], distanceCriterion: number) {
        return (point1) => {
            if (nearCustomers.filter(c => c.Location.longitude == point1.longitude).length > 0)
                return (1-Math.random()) * distanceCriterion;
            else
                return (1+Math.random()) * distanceCriterion;
        }
    }

    it('does not call the calculator GetDistanceInKilometers method when list of customers is empty' , () => {

        // arrange
        const location = { longitude: 21, latitude: 52 };
        const distance = 13;
        const customers = [];
        const calculator = new DistanceCalculatorImpl();
        const getDistanceSpy = chai.spy.on(calculator, 'GetDistanceInKilometers');
        const filter = new CloseCustomersFilter(calculator, location, distance);

        // act
        filter.Filter(customers);

        // assert
        expect(getDistanceSpy).not.to.have.been.called;
    });

    it('calls the calculator GetDistanceInKilometers method only once given a list with one customer' , () => {

        // arrange
        const location = { longitude: 21, latitude: 52 };
        const distance = 13;
        const customers = [
            new Customer(1, 'John Doe', 1, 33)
        ];
        const calculator = new DistanceCalculatorImpl();
        const getDistanceSpy = chai.spy.on(calculator, 'GetDistanceInKilometers');
        const filter = new CloseCustomersFilter(calculator, location, distance);

        // act
        filter.Filter(customers);

        // assert
        expect(getDistanceSpy).to.have.been.called.once;
        expect(getDistanceSpy).to.have.been.called.with({ longitude: 1, latitude: 33 }, { longitude: 21, latitude: 52 });
    });

    it('calls the calculator GetDistanceInKilometers method once for every customer' , () => {

        // arrange
        const location = { longitude: 21, latitude: 52 };
        const distance = 13;
        const customers = [
            new Customer(1, 'John Doe 1', 1, 33),
            new Customer(2, 'John Doe 2', -51, -13),
            new Customer(3, 'John Doe 3', 1, 46),
            new Customer(4, 'John Doe 4', -1, 1)
        ];
        const calculator = new DistanceCalculatorImpl();
        const getDistanceSpy = chai.spy.on(calculator, 'GetDistanceInKilometers');
        const filter = new CloseCustomersFilter(calculator, location, distance);

        // act
        filter.Filter(customers);

        // assert
        expect(getDistanceSpy).to.have.been.called.exactly(4);
        customers.forEach((c: Customer) => {
            expect(getDistanceSpy).to.have.been.called.with( c.Location, { longitude: 21, latitude: 52 });
        });
    });

    it('returns the customers that the calculator computes as near customers' , () => {

        // arrange
        const location = { longitude: 21, latitude: 52 };
        const distance = 100;
        const closeCustomers: Customer[] = [
            new Customer(1, 'John Doe 1', -99.33, 0),
            new Customer(2, 'John Doe 2', 1.232323, 34.34234)
        ];
        const farCustomers   =  [
            new Customer(3, 'John Doe 3', 4.09, 11.001),
            new Customer(4, 'John Doe 4', 11.001, 22.1)
        ];
        const customers = [...closeCustomers, ...farCustomers];

        const calculator = new DistanceCalculatorImpl();
        chai.spy.on(calculator, 'GetDistanceInKilometers', MockDistanceInKilometersMethod(closeCustomers, distance));
        const filter = new CloseCustomersFilter(calculator, location, distance);

        // act
        const result = filter.Filter(customers);

        // assert
        expect(result).to.have.length(closeCustomers.length);
        closeCustomers.forEach(c => expect(result).to.deep.include(c));
        farCustomers.forEach(c => expect(result).not.to.deep.include(c));
    });

    it('returns empty array when calculator finds no near customers' , () => {

        // arrange
        const location = { longitude: 21, latitude: 52 };
        const distance = 100;
        const closeCustomers: Customer[] = [];
        const farCustomers   =  [
            new Customer(1, 'John Doe 1', -99.33, 0),
            new Customer(2, 'John Doe 2', 1.232323, 34.34234),
            new Customer(3, 'John Doe 3', 4.09, 11.001),
            new Customer(4, 'John Doe 4', 11.001, 22.1)
        ];
        const customers = [...closeCustomers, ...farCustomers];

        const calculator = new DistanceCalculatorImpl();
        chai.spy.on(calculator, 'GetDistanceInKilometers', MockDistanceInKilometersMethod(closeCustomers, distance));
        const filter = new CloseCustomersFilter(calculator, location, distance);

        // act
        const result = filter.Filter(customers);

        // assert
        expect(result).to.have.length(closeCustomers.length);
        closeCustomers.forEach(c => expect(result).to.deep.include(c));
        farCustomers.forEach(c => expect(result).not.to.deep.include(c));
    });

    it('returns all customers when calculator finds all customers to be near' , () => {

        // arrange
        const location = { longitude: 21, latitude: 52 };
        const distance = 100;
        const nearCustomers   =  [
            new Customer(1, 'John Doe 1', -99.33, 0),
            new Customer(2, 'John Doe 2', 1.232323, 34.34234),
            new Customer(3, 'John Doe 3', 4.09, 11.001),
            new Customer(4, 'John Doe 4', 11.001, 22.1)
        ];
        const farCustomers: Customer[] = [];

        const customers = [...nearCustomers, ...farCustomers];

        const calculator = new DistanceCalculatorImpl();
        chai.spy.on(calculator, 'GetDistanceInKilometers', MockDistanceInKilometersMethod(nearCustomers, distance));

        // act
        const filter = new CloseCustomersFilter(calculator, location, distance);
        const result = filter.Filter(customers);

        // assert
        expect(result).to.have.length(nearCustomers.length);
        nearCustomers.forEach(c => expect(result).to.deep.include(c));
        farCustomers.forEach(c => expect(result).not.to.deep.include(c));
    });
});