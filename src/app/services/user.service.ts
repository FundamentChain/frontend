import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetamaskService } from './metamask.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl ='http://localhost:3000';
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private MetamaskService: MetamaskService) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getUserByWallet(wallet: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/search/${wallet}`);
  }

  async putUpdateUser(
    usermane: string,
    email: string,
    description: string,
    image: string,
  ) {

    const wallet = await this.MetamaskService.currentAccountCorreta();
    
    const body = {
      "usermane": usermane,
      "email": email,
      "description": description,
      "image": image,
    };

    return this.http.put<string>(`${this.apiUrl}/users/update/${wallet}`, body, this.httpHeader);

  }

}
