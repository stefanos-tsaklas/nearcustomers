import Customer from '../model/Customer';

export default interface PostAction {
    Process(customers: Customer[]): void;
}