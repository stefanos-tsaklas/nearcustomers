import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';
import Customer from '../../src/model/customer';
import CustomerLoaderFileSystem from '../../src/loader/customer-loader-file-system';

chai.use(chaiSpies);
const expect = chai.expect;

const testCases = [
    { 
        line: '{"latitude": "90", "user_id": 21, "name": "Stefanos Tsaklas", "longitude": "180"}',
        expected: new Customer(21, 'Stefanos Tsaklas', 180, 90)
    },
    { 
        line: '{"name": "John Doe", "user_id": 13, "longitude": "-11", "latitude": "-1"}',
        expected: new Customer(13, 'John Doe', -11, -1)
    },
    { 
        line: '{"nameeee": "John Does", "user_id": 13, "longitude": "-11", "latitude": "-1"}',
        expected: null
    },
    { 
        line: '{"name": "John Does", "user_idddd": 13, "longitude": "-11", "latitude": "-1"}',
        expected: null
    },
    { 
        line: '{"name": "John Does", "user_id": 13, "longitudeee": "-11", "latitude": "-1"}',
        expected: null
    },
    { 
        line: '{"name": "John Does", "user_id": 13, "longitude": "-11", "latitudeeee": "-1"}',
        expected: null
    },
    { 
        line: '{"latitude": "invalid", "user_id": 21, "name": "Stefanos Tsaklas", "longitude": "180"}',
        expected: null
    },
    { 
        line: '{"latitude": "90", "user_id": 21, "name": "Stefanos Tsaklas", "longitude": "invalid"}',
        expected: null
    },
    { 
        line: 'qwertyuiop',
        expected: null
    },
    {
        line: '          ',
        expected: null
    },
    {
        line: ' ',
        expected: null
    },
];

describe('CustomerLoaderFileSystem unit test suite', () => {

    testCases.forEach(function(testCase) {
        it(`correctly loads customer from line '${testCase.line}'`, function() {

            // arrange
            const loader = new CustomerLoaderFileSystem('');

            // act
            const result = loader.ReadCustomerFromLine(testCase.line);

            // assert
            expect(result).to.be.deep.equals(testCase.expected);
        });
    });
});
