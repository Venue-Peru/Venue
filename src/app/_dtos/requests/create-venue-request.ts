export class CreateVenueRequest {
    name: string;
    location: string;
    image: string;

    constructor(name: string, location: string, image: string) {
        this.name = name;
        this.location = location;
        this.image = image;
    }
}
