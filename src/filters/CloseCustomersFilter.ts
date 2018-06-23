import DistanceCalculator from '../interfaces/DistanceCalculator';
import Customer from '../model/Customer';
import Coordinate from '../model/Coordinate';
import CustomerFilterI from './CustomerFilterI';

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