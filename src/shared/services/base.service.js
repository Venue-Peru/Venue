import http from "./http-common.js";

export class BaseService {
    complementUrl;

    getAll() {
        return http.get(this.complementUrl);
    }
    getById(id) {
        return http.get(`${this.complementUrl}/${id}`);
    }
    create(data) {
        return http.post(this.complementUrl, data);
    }
    update(id, data) {
        return http.put(`${this.complementUrl}/${id}`, data);
    }
    delete(id) {
        return http.delete(`${this.complementUrl}/${id}`);
    }
}