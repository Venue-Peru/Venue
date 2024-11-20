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
  constructor() { }
}