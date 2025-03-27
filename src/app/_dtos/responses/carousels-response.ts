import {Session} from "../../sessions/model/session";

export class CarouselsResponse {
    carouselName: string;
    sessions: Session[];

    constructor() {
        this.carouselName = '';
        this.sessions = [];
    }
}
