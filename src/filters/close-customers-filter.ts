import Customer from '../model/customer';
import Coordinate from '../model/coordinate';
import CustomerFilter from '../interfaces/customer-filter';
import DistanceCalculator from '../interfaces/distance-calculator';

export default class CloseCustomersFilter implements CustomerFilter {

    public constructor(private calculator: DistanceCalculator, private location: Coordinate, private distanceKm: number) {
    }

    public Filter(customers: Customer[]): Customer[] {
        return this.FindCustomersByFilter(customers, c => {
            return this.calculator.GetDistanceInKilometers(c.Location, this.location) <= this.distanceKm;
        });
    }

    private FindCustomersByFilter(customers: Customer[], condition: (customer: Customer) => boolean): Customer[] {
        let eligibleCustomers = customers.filter(c => condition(c));
        return eligibleCustomers;
    }
}