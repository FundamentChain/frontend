import { Injectable, OnInit } from '@angular/core';
import { User } from './user.model';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user = new BehaviorSubject<User | undefined>(undefined);

  get user$(): Observable<User | undefined> {
    return this._user.asObservable();
  }

  constructor(private apiService: ApiService) {}

  async fetchUserByWallet(wallet: string): Promise<void> { 
    this.apiService.getUserByWallet(wallet).subscribe(data => {
      this._user.next(data);
    });
  }
}
export default UserService;