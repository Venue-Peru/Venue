import {BraceletType} from "../../../_enums/bracelet-types";

export class SessionBraceletTypeResponse {
    name: string;
    color: string;
    key: string;
    braceletType: BraceletType;

    constructor(name: string, color: string, key: string, braceletType: BraceletType) {
        this.name = name;
        this.color = color;
        this.key = key;
        this.braceletType = braceletType;
    }
}
