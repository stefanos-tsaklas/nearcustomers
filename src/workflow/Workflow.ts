import CustomerLoader from '../interfaces/CustomerLoader';
import CustomerFilter from '../interfaces/CustomerFilter';
import PostAction from '../interfaces/PostAction';

export default class Workflow {

    constructor(private customerLoader: CustomerLoader, private filters: CustomerFilter[], private postActions: PostAction[]) {
    }
    
    public Solve(): void {

        var customers = this.customerLoader.LoadCustomers();

        this.filters.forEach(f => {
            customers = f.Filter(customers);
        });

        this.postActions.forEach(p => {
            p.Process(customers);
        })
    }
}
