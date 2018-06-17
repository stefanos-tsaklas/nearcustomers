import DistanceCalculatorI from "../interfaces/DistanceCalculatorI";
import DistanceCalculatorImpl  from "../distance/DistanceCalculatorImpl";
import CustomerFinderI from "./CustomerFinderI";
import Customer from "../model/Customer";
import Coordinate from "../model/Coordinate";
import CustomerFilterI from "./CustomerFilterI";

export default class CloseCustomersFilter implements CustomerFilterI {

    public constructor(private calculator: DistanceCalculatorI, private location: Coordinate, private distanceKm: number) {
    }

    public Filter(customers: Customer[]): Customer[] {

        return this.FindCustomersByFilter(customers, c => {
            let distance = this.calculator.GetDistanceInKilometers(this.location, c.Location);
            return this.calculator.GetDistanceInKilometers(this.location, c.Location) <= this.distanceKm;
        });
    }

    private FindCustomersByFilter(customers: Customer[], condition: (customer: Customer) => boolean): Customer[] {
        let eligibleCustomers = customers.filter(c => condition(c));
        return eligibleCustomers;
    }
}