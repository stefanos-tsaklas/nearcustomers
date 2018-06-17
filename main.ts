import Coordinate from "./model/Coordinate";
import CustomerLoaderFileSystem from "./loader/CustomerLoaderFileSystem";
import DistanceCalculatorImpl from "./distance/DistanceCalculatorImpl";
import CloseCustomersFilter from "./filters/CloseCustomersFilter";
import SortCustomersByIdFilter from "./filters/SortCustomersByIdFilter";
import PrintCustomersAction from "./actions/PrintCustomersAction";
import Workflow from "./workflow/Workflow";

const DUBLIN_COORDINATES: Coordinate = { latitude: 53.339428, longitude: -6.257664 };
const fileinput = process.argv[2] || "input.txt";
const distanceKm = parseInt(process.argv[3] || "100");

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
