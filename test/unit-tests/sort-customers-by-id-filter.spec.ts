import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';
import Customer from '../../src/model/customer';
import SortCustomersByIdFilter from '../../src/filters/sort-customers-by-id-filter';

chai.use(chaiSpies);
const expect = chai.expect;

describe('SortCustomersById unit test suite', () => {

    it('sorts empty array of customers and returns empty array' , () => {

        // arrange
        const sortFilter = new SortCustomersByIdFilter();

        // act
        const results = sortFilter.Filter([]);

        // assert
        expect(results).to.have.length(0);
    });

    it('sorts array of one customer and returns the same elements' , () => {

        // arrange
        const customers = [new Customer(1, 'John Doe', 1, 44)];
        const sortFilter = new SortCustomersByIdFilter();

        // act
        const results = sortFilter.Filter(customers);

        // assert
        expect(results).to.have.length(1);
        expect(results).to.be.equal(customers);
    });

    it('sorts already sorted aray' , () => {

        // arrange
        const customers = [
            new Customer(1, 'John Doe 1', 4, 44),
            new Customer(2, 'John Doe 2', 3, 43),
            new Customer(3, 'John Doe 3', 2, 42),
            new Customer(4, 'John Doe 4', 1, 41)
        ];
        const expectedResult = [
            new Customer(1, 'John Doe 1', 4, 44),
            new Customer(2, 'John Doe 2', 3, 43),
            new Customer(3, 'John Doe 3', 2, 42),
            new Customer(4, 'John Doe 4', 1, 41)
        ];
        const sortFilter = new SortCustomersByIdFilter();

        // act
        const results = sortFilter.Filter(customers);

        // assert
        expect(results).to.be.deep.equal(expectedResult);
    });

    it('sorts reverse sorted aray' , () => {

        // arrange
        const customers = [
            new Customer(4, 'John Doe 4', 1, 41),
            new Customer(3, 'John Doe 3', 2, 42),
            new Customer(2, 'John Doe 2', 3, 43),
            new Customer(1, 'John Doe 1', 4, 44)
        ];
        const expectedResult = [
            new Customer(1, 'John Doe 1', 4, 44),
            new Customer(2, 'John Doe 2', 3, 43),
            new Customer(3, 'John Doe 3', 2, 42),
            new Customer(4, 'John Doe 4', 1, 41)
        ];
        const sortFilter = new SortCustomersByIdFilter();

        // act
        const results = sortFilter.Filter(customers);

        // assert
        expect(results).to.be.deep.equal(expectedResult);
    });

    it('sorts array with duplicates' , () => {

        // arrange
        const customers = [
            new Customer(9, 'John Doe 9', 1, 1),
            new Customer(1, 'John Doe 1', 4, 44),
            new Customer(4, 'John Doe 4', 1, 41),
            new Customer(4, 'John Doe 4', 1, 41),
            new Customer(7, 'John Doe 7', 7, 77),
            new Customer(3, 'John Doe 3', 2, 42),
            new Customer(2, 'John Doe 2', 3, 43),
            new Customer(1, 'John Doe 1', 4, 44)
        ];
        const expectedResult = [
            new Customer(1, 'John Doe 1', 4, 44),
            new Customer(1, 'John Doe 1', 4, 44),
            new Customer(2, 'John Doe 2', 3, 43),
            new Customer(3, 'John Doe 3', 2, 42),
            new Customer(4, 'John Doe 4', 1, 41),
            new Customer(4, 'John Doe 4', 1, 41),
            new Customer(7, 'John Doe 7', 7, 77),
            new Customer(9, 'John Doe 9', 1, 1),
        ];
        const sortFilter = new SortCustomersByIdFilter();

        // act
        const results = sortFilter.Filter(customers);

        // assert
        expect(results).to.be.deep.equal(expectedResult);
    });
});