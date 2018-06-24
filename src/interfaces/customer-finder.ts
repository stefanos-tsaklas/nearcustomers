import Coordinate  from '../model/coordinate';
import Customer from '../model/customer';

export default interface CustomerFinder {
    FindCloseSortedCustomers(customers: Customer[], location: Coordinate, distanceKm: number): Customer[];
}