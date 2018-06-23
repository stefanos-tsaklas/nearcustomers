import Customer from '../model/Customer';
import CustomerLoader from '../interfaces/CustomerLoader';

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
