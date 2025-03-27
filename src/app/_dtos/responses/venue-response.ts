export class VenueResponse {
    name: string;
    backgroundImage: string;
    location: string;

    constructor(name: string, backgroundImage: string, location: string) {
        this.name = name;
        this.backgroundImage = backgroundImage;
        this.location = location;
    }
}
