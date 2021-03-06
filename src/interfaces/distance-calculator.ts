import Coordinate from '../model/Coordinate';

export default abstract class DistanceCalculator {
    public static EARTH_RADIUS_M = 6371000;

    public FromDegreesToRadians(degrees: number): number {
        return Math.PI * degrees/180;
    }

    public abstract GetDistanceInKilometers(c1: Coordinate, c2: Coordinate): number;
}