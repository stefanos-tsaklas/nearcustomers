import Customer from '../model/customer';
import Coordinate  from '../model/coordinate';

export default interface CustomerFinder {
    FindCloseSortedCustomers(customers: Customer[], location: Coordinate, distanceKm: number): Customer[];
}