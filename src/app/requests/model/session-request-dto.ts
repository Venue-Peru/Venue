/*
String sessionUuid,
        String profileUuid,
        Long desiredCategory
 */
export class SessionRequestDto {
    sessionUuid: string;
    profileUuid: string;
    desiredCategory: number;

    constructor() {
        this.sessionUuid = '';
        this.profileUuid = '';
        this.desiredCategory = 0;
    }
}
