import CloseCustomersFilter from '../filters/close-customers-filter';
import Coordinate from '../model/Coordinate';
import CustomerLoaderFileSystem from '../loader/customer-loader-file-system';
import DistanceCalculatorImpl from '../distance/distance-calculator-impl';
import PrintCustomersAction from '../actions/print-customers-action';
import SortCustomersByIdFilter from '../filters/sort-customers-by-id-filter';
import Workflow from './workflow';

export const DUBLIN_COORDINATES: Coordinate = { longitude: -6.257664 , latitude: 53.339428};

export default class SolutionWorkflow extends Workflow{

    public constructor(filepath: string, distanceKm: number, sourcePoint: Coordinate) {

        const customerLoader = new CustomerLoaderFileSystem(filepath);
        const distanceCalculator = new DistanceCalculatorImpl();
        const filters = [
            new CloseCustomersFilter(
                distanceCalculator,
                sourcePoint,
                distanceKm),
            new SortCustomersByIdFilter()
        ];
        const postActions = [
            new PrintCustomersAction()
        ];

        super(customerLoader, filters, postActions);
    }
}