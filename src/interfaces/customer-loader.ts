import Customer from '../model/customer';

export default abstract class CustomerLoader {
    abstract LoadCustomers(): Customer[];
}