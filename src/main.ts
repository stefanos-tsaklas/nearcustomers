import Coordinate from './model/coordinate';
import SolutionWorkflow, { DUBLIN_COORDINATES } from './workflow/solution-workflow';

const fileinput = process.argv[2] || './data/input.txt';
const distanceKm = parseInt(process.argv[3] || '100');
const sourcePoint: Coordinate = {
    longitude: parseFloat(process.argv[4]) || DUBLIN_COORDINATES.longitude,
    latitude: parseFloat(process.argv[5]) || DUBLIN_COORDINATES.latitude
};

new SolutionWorkflow(fileinput, distanceKm, sourcePoint).Run();