/*
Long id,
        Long profileId,
        String profileUuid,
        String sessionUuid,
        String name,
        String username,
        Long desiredCategory
 */
export class ProfileFromSessionRequest {
    id: number;
    profileId: number;
    profileUuid: string;
    sessionUuid: string;
    name: string;
    username: string;
    desiredCategory: number;

    constructor() {
        this.id = 0;
        this.profileId = 0;
        this.profileUuid = '';
        this.sessionUuid = '';
        this.name = '';
        this.username = '';
        this.desiredCategory = 0;
    }
}
