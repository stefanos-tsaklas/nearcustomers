import Customer from '../model/Customer';
import PostActionI from '../interfaces/PostAction';

export default class PrintCustomersAction implements PostActionI {

    Process(customers: Customer[]): void {
        customers.forEach( c => { 
            console.log(`UserId: ${c.UserId} Name: ${c.Name}`)
        });
    }
}