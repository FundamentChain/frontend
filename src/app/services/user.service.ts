import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { IpfsService } from './ipfs.service';

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
    private ipfsService: IpfsService) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
      switchMap(async (users: any[]) => {
        const modifiedUsers = await Promise.all(users.map(async (user) => {
          //const file = await this.ipfsService.retrieveFile(user.image);
          //user.image = URL.createObjectURL(file);
          console.log(user)
          return user;
        }));
        return modifiedUsers;
      })
    );
  }
  
  getUserByWallet(wallet: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/search/${wallet}`).pipe(
      switchMap(async (user: any) => {
        //const file = await this.ipfsService.retrieveFile(user.image);
        //user.image = URL.createObjectURL(file);
        return user;
      })
    );
  }
  
  putUpdateUser(
    wallet: string, 
    usermane: string,
    email: string,
    description: string,
    image: string
  ): Observable<any> {
    const body = {
      "usermane": usermane,
      "email": email,
      "description": description,
      "image": image
    };
    return this.http.put<any>(`${this.apiUrl}/users/update/${wallet}`, body, this.httpHeader);
  }

}

