export class VenueHost {
    id: number;
    name: string;
    logo: string;
    description: string;
    capacity: number;
    rating: number;
    instagramUrl: string;
    tiktokUrl: string;

    constructor(){
        this.id = 0;
        this.name = "";
        this.logo = "";
        this.description = "";
        this.capacity = 0;
        this.rating = 0;
        this.instagramUrl = "";
        this.tiktokUrl = "";
    }
}
