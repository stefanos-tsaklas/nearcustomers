import Customer from '../model/Customer';

export default interface CustomerFilter {
    Filter(customers: Customer[]): Customer[];
}