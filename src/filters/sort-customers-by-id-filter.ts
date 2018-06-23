import Customer from '../model/customer';
import CustomerFilter from '../interfaces/customer-filter';

export default class SortCustomersByIdFilter implements CustomerFilter {

    public constructor() {
    }

    public Filter(customers: Customer[]): Customer[] {
        return customers.sort((c1, c2) => {
            return c1.UserId - c2.UserId
        })    
    }
}