import Customer from "../model/Customer";

export default interface PostActionI {
    Process(customers: Customer[]): void;
}