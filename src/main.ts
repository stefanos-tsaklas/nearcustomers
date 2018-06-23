import Coordinate from './model/coordinate';
import CustomerLoaderFileSystem from './loader/customer-loader-file-system';
import DistanceCalculatorImpl from './distance/distance-calculator-impl';
import CloseCustomersFilter from './filters/close-customers-filter';
import SortCustomersByIdFilter from './filters/sort-customers-by-id-filter';
import PrintCustomersAction from './actions/print-customers-action';
import Workflow from './workflow/workflow';

const DUBLIN_COORDINATES: Coordinate = { latitude: 53.339428, longitude: -6.257664 };
const fileinput = process.argv[2] || 'input.txt';
const distanceKm = parseInt(process.argv[3] || '100');

const customerLoader = new CustomerLoaderFileSystem(fileinput);
const distanceCalculator = new DistanceCalculatorImpl();
const filters = [
    new CloseCustomersFilter(
        distanceCalculator,
        DUBLIN_COORDINATES,
        distanceKm),
    new SortCustomersByIdFilter()
];
const postActions = [
    new PrintCustomersAction()
];

new Workflow(customerLoader, filters, postActions).Solve();
