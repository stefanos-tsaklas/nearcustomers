import Customer from "../model/Customer";
import PostActionI from "../interfaces/PostActionI";

export default class PrintCustomersAction implements PostActionI {

    Process(customers: Customer[]): void {
        customers.forEach( c => { 
            console.log(`UserId: ${c.UserId} Name: ${c.Name}`)
        });
    }
}