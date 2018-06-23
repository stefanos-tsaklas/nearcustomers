import Customer from '../model/Customer';
import PostAction from '../interfaces/post-action';

export default class PrintCustomersAction implements PostAction {

    public Process(customers: Customer[]): void {
        customers.forEach( c => {
            // eslint-disable-next-line no-console
            console.log(`UserId: ${c.UserId} Name: ${c.Name}`);
        });
    }
}