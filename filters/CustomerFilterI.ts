import Customer from "../model/Customer";

export default interface CustomerFilterI {
    Filter(customers: Customer[]): Customer[];
}