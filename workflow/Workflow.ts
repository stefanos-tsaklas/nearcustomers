import CustomerLoaderI from "../loader/CustomerLoaderI";
import CustomerFilterI from "../filters/CustomerFilterI";
import PostActionI from "../interfaces/PostActionI";

export default class Workflow {

    constructor(private customerLoader: CustomerLoaderI, private filters: CustomerFilterI[], private postActions: PostActionI[]) {
    }
    
    public Solve(): void {

        var customers =this.customerLoader.LoadCustomers();

        this.filters.forEach(f => {
            customers = f.Filter(customers);
        });

        this.postActions.forEach(p => {
            p.Process(customers);
        })
    }
}