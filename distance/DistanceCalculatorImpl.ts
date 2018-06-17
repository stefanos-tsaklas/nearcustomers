import Coordinate from "../model/Coordinate";
import DistanceCalculatorI from "../interfaces/DistanceCalculatorI";

export default class DistanceCalculatorImpl extends DistanceCalculatorI {
    
    public DistanceCalculatorImpl () {
    }

    GetDistanceInKilometers(c1: Coordinate, c2: Coordinate): number {
        let lat1Rads = this.FromDegreesToRadians(c1.latitude);
        let lat2Rads = this.FromDegreesToRadians(c2.latitude);
        let latDiffRads = this.FromDegreesToRadians(c2.latitude - c1.latitude);
        let longDiffRads = this.FromDegreesToRadians(c2.longitude - c1.longitude);
        let a = Math.sin(latDiffRads / 2) * Math.sin(latDiffRads / 2) +
          Math.cos(lat1Rads) * Math.cos(lat2Rads) *
          Math.sin(longDiffRads/ 2) * Math.sin(longDiffRads / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = DistanceCalculatorI.EARTH_RADIUS_M * c;
        return d / 1000;
    }
}