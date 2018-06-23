import Customer from '../model/customer';
import CustomerLoader from '../interfaces/customer-loader';

export default class CustomerLoaderFileSystem implements CustomerLoader {

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
