import Customer from "../model/Customer";
import Coordinate  from "../model/Coordinate";

export default interface CustomerFinderI {
    FindCloseSortedCustomers(customers: Customer[], location: Coordinate, distanceKm: number): Customer[];
}