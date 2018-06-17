import CustomerFinderI from "../filters/CustomerFinderI";
import Customer from "../model/Customer";
import CustomerLoaderI from "./CustomerLoaderI";

export default class CustomerLoaderFileSystem implements CustomerLoaderI {

    public constructor(private filepath: string) {
    }

    public LoadCustomers(): Customer[] {

        var customers = [];
        require('fs')
            .readFileSync(this.filepath, 'utf-8')
            .split('\n')
            .forEach(line => {
                let c = JSON.parse(line);
                customers.push(new Customer(c.user_id, c.name, c.longitude, c.latitude));
            });
            
        return customers;
    }
}
