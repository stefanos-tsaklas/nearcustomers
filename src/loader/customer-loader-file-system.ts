import Customer from '../model/customer';
import CustomerLoader from '../interfaces/customer-loader';

export default class CustomerLoaderFileSystem implements CustomerLoader {

    public constructor(private filepath: string) {
    }
    /**
     * Loads customers given a file name
     * Throws error if file does not exist
     * @returns {Customer[]} the valid customer instances after reading the file
     * @memberof CustomerLoaderFileSystem
     */
    public LoadCustomers(): Customer[] {

        var customers = [];
        require('fs')
            .readFileSync(this.filepath, 'utf-8')
            .split('\n')
            .map(line => this.ReadCustomerFromLine(line))
            .map(customer => {
                if (customer)
                    customers.push(customer);
            });
        return customers;
    }

    /**
     * Returns a customer object if input line is valid json, otherwise null
     *
     * @param {string} line from file representing a customer
     * @returns {Customer} the customer object corresponding to the line
     * @memberof CustomerLoaderFileSystem
     */
    public ReadCustomerFromLine(line: string): Customer {
        try {
            let c = JSON.parse(line);
            let longitude = parseFloat(c.longitude);
            let latitude = parseFloat(c.latitude);
            if (c.user_id && c.name && !isNaN(longitude) && !isNaN(latitude)) {
                return new Customer(c.user_id, c.name, longitude, latitude);
            }
            else {
                return null;
            }
        }
        catch (Exception) {
            return null;
        }
    }
}