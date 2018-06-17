import Coordinate from "../model/Coordinate";

export default class Customer {

    private userId: number;
    private name: string;
    private location: Coordinate;
    
    public constructor (userId: number, name: string, longitude: number, latitude: number) {
        this.userId = userId;
        this.name = name;
        this.location = { "longitude": longitude, "latitude": latitude };
    }

    public get UserId(): number
    {
        return this.userId;
    }

    public get Name(): string
    {
        return this.name;
    }

    public get Location(): Coordinate
    {
        return this.location;
    }
}