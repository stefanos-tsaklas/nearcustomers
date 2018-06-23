import Customer from '../model/Customer';
import Coordinate  from '../model/Coordinate';

export default interface CustomerFinder {
    FindCloseSortedCustomers(customers: Customer[], location: Coordinate, distanceKm: number): Customer[];
}