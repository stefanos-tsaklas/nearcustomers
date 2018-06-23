import PrintCustomersAction from "../actions/PrintCustomersAction";
import Customer from "../model/Customer";
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';
import * as sinonChai from 'sinon-chai';

chai.use(chaiSpies);

const should = chai.should(), expect = chai.expect;

const sandbox = chai.spy.sandbox();

describe('PrintCustomersAction test suite', () => {

  beforeEach(() => {
    sandbox.on(console, ["log"]);
  });

  afterEach(() => {
    sandbox.restore(); // restores original methods
  })

  it('does not print anything if passed an empty list of customers' , () => {

    // act
    let action = new PrintCustomersAction();
    action.Process([]);

    // assert
    expect(console.log).not.to.have.been.called;
  });

  it('calls print once if passes an array with one customer' , () => {

    // act
    let action = new PrintCustomersAction();
    action.Process([new Customer(1, "John", 1, 2)]);

    // assert
    expect(console.log).to.have.been.called.once;
  });

  it('calls print twice if passes an array with two customers' , () => {

    // act
    let action = new PrintCustomersAction();
    action.Process([new Customer(1, "John", 1, 2), new Customer(2, "Doe", 1, 2)]);

    // assert
    expect(console.log).to.have.been.called.twice;
  });

  it('prints the expected message for one customer' , () => {

    // arrange
    var customerList = [new Customer(42, "John", 3, 4)];
    var expectedMessage = "UserId: 42 Name: John";

    // act
    let action = new PrintCustomersAction();
    action.Process(customerList);

    // assert
    expect(console.log).to.have.been.called.with(expectedMessage);
  });

});