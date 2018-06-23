import DistanceCalculator from '../interfaces/distance-calculator';
import Customer from '../model/customer';
import Coordinate from '../model/coordinate';
import CustomerFilterI from './customer-filter';

export default class CloseCustomersFilter implements CustomerFilterI {

    public constructor(private calculator: DistanceCalculator, private location: Coordinate, private distanceKm: number) {
    }

    public Filter(customers: Customer[]): Customer[] {
        return this.FindCustomersByFilter(customers, c => {
            return this.calculator.GetDistanceInKilometers(this.location, c.Location) <= this.distanceKm;
        });
    }

    private FindCustomersByFilter(customers: Customer[], condition: (customer: Customer) => boolean): Customer[] {
        let eligibleCustomers = customers.filter(c => condition(c));
        return eligibleCustomers;
    }
}