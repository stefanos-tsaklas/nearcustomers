import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';
import Customer from '../../src/model/customer';
import CustomerLoaderFileSystem from '../../src/loader/customer-loader-file-system';

chai.use(chaiSpies);
const expect = chai.expect;
const assert = chai.assert;

const testCases = [
    {
        fileInput: './data/input_1.txt',
        expectedCustomers: [
            new Customer(91, '41.27 km away', -6, 53),
            new Customer(82, '75.39 km away', -6, 54),
            new Customer(44, '102.66 km away', -6, 54.25),
            new Customer(1, '83.65 km away', -5, 53.3),
            new Customer(32, '50.52 km away', -5.5, 53.3),
            new Customer(14, '1008.13 km away', 5, 60),
            new Customer(67, '4076.47 km away', 90, 90),
            new Customer(44, '5959.28 km away', 0, 0),
            new Customer(21, '15938.62 km away', -90, -90),
            new Customer(21, '4076.47 km away', 180, 90)
        ]
    },
    {
        fileInput: './data/input_2.txt',
        expectedCustomers: [
            new Customer(21, '4076.47 km away', 90, 190)
        ]
    }
];

describe('CustomerLoaderFileSystem integration test suite', () => {

    testCases.forEach(testCase => {
        it(`loads expected customers from ${testCase.fileInput}` , () => {

            // arrange
            const loader = new CustomerLoaderFileSystem(testCase.fileInput);
    
            // act
            const results = loader.LoadCustomers();
    
            // assert
            expect(results).to.have.length(testCase.expectedCustomers.length);
            testCase.expectedCustomers.forEach(c => expect(results).to.deep.include(c));
        });
    });

    it('throws exeption when file does not exist', () => {

        // arrange
        const loader = new CustomerLoaderFileSystem('nonexistingfile.tct');

        // act & assert (test running on Windows)
        assert.throws(() => loader.LoadCustomers(), Error, 'no such file');
    });
});