import Customer from '../model/Customer';

export default abstract class CustomerLoader {
    abstract LoadCustomers(): Customer[];
}