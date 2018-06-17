import Customer from "../model/Customer";

export default abstract class CustomerLoaderI {
    abstract LoadCustomers(): Customer[];
}