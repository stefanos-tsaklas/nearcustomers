import DistanceCalculatorImpl  from '../distance/DistanceCalculatorImpl';
import Customer from '../model/Customer';
import Coordinate from '../model/Coordinate';
import CustomerFilter from '../interfaces/CustomerFilter';

export default class SortCustomersByIdFilter implements CustomerFilter {

    public constructor() {
    }

    public Filter(customers: Customer[]): Customer[] {
        return customers.sort((c1, c2) => {
            return c1.UserId - c2.UserId
        })    
    }
}