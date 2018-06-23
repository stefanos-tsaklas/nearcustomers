import Customer from '../model/customer';

export default interface CustomerFilter {
    Filter(customers: Customer[]): Customer[];
};