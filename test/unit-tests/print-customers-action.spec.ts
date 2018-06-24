import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';
import Customer from '../../src/model/customer';
import PrintCustomersAction from '../../src/actions/print-customers-action';

chai.use(chaiSpies);

const expect = chai.expect;

describe('PrintCustomersAction unit test suite', () => {

    const sandbox = chai.spy.sandbox();

    beforeEach(() => {
      sandbox.on(console, ['log']);
    });

    afterEach(() => {
      sandbox.restore(); // restores original methods
    })

    it('does not print anything if passed an empty list of customers' , () => {

      // arrange
      const action = new PrintCustomersAction();

      // act
      action.Process([]);

      // assert
      // eslint-disable-next-line no-console
      expect(console.log).not.to.have.been.called;
    });

    it('calls print once if passes an array with one customer' , () => {

      // arrange
      const action = new PrintCustomersAction();

      // act
      action.Process([new Customer(1, 'John', 1, 2)]);

      // assert
      // eslint-disable-next-line no-console
      expect(console.log).to.have.been.called.once;
    });

    it('calls print twice if passes an array with two customers' , () => {

      // arrange
      const action = new PrintCustomersAction();

      // act
      action.Process([new Customer(1, 'John', 1, 2), new Customer(2, 'Doe', 1, 2)]);

      // assert
      // eslint-disable-next-line no-console
      expect(console.log).to.have.been.called.twice;
    });

    it('prints the expected message for one customer' , () => {

      // arrange
      const customerList = [new Customer(42, 'John', 3, 4)];
      const expectedMessage = 'UserId: 42 Name: John';
      const action = new PrintCustomersAction();

      // act
      action.Process(customerList);

      // assert
      // eslint-disable-next-line no-console
      expect(console.log).to.have.been.called.with(expectedMessage);
    });
});