import CustomerLoader from '../interfaces/customer-loader';
import CustomerFilter from '../interfaces/customer-filter';
import PostAction from '../interfaces/post-action';

export default abstract class Workflow {

    public constructor(private customerLoader: CustomerLoader, private filters: CustomerFilter[], private postActions: PostAction[]) {
    }

    public Run(): void {

        var customers = this.customerLoader.LoadCustomers();

        this.filters.forEach(f => {
            customers = f.Filter(customers);
        });

        this.postActions.forEach(p => {
            p.Process(customers);
        });
    }
}