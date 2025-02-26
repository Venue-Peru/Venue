import { Injectable } from '@angular/core';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

  getUUIDFromToken(token: string): string | null {
    const decoded = this.decodeToken(token);
    return decoded?.uuid || null; // Adjust the key name based on your token's payload
  }

  getRoleFromToken(token: string): string {
    const decoded = this.decodeToken(token);
    return decoded?.role || ''; // Adjust the key name based on your token's payload
  }

  getUsernameFromToken(token: string): string {
    const decoded = this.decodeToken(token);
    return decoded?.username || '';
  }

  getToken(): string {
    let token = localStorage.getItem('token');
    if (!token) {
      return "";
    }
    return token;
  }

  constructor() { }
}
