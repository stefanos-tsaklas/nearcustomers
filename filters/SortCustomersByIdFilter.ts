import DistanceCalculatorImpl  from "../distance/DistanceCalculatorImpl";
import CustomerFinderI from "./CustomerFinderI";
import Customer from "../model/Customer";
import Coordinate from "../model/Coordinate";
import CustomerFilterI from "./CustomerFilterI";

export default class SortCustomersByIdFilter implements CustomerFilterI {

    public constructor() {
    }

    public Filter(customers: Customer[]): Customer[] {
        return customers.sort((c1, c2) => {
            return c1.UserId - c2.UserId
        })    
    }
}