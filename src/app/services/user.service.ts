import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL ='http://localhost:3000';
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/users`);
  }

  getUserByWallet(wallet: string): Observable<any> {
    console.log("carteira user service",wallet);
    console.log(`${this.apiURL}/users/search?wallet=${wallet}`);
    console.log(this.http.get<any>(`${this.apiURL}/users/search?wallet=${wallet}`));
    
    
    return this.http.get<any>(`${this.apiURL}/users/search?wallet=${wallet}`);
    
    
  }
}
