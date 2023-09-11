import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetamaskService } from './metamask.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient,
    private metamasService : MetamaskService) {}

  getOpenProposals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/proposals/live_proposals`);
  }

  getEndedProposals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/proposals/ended_proposals`);
  }

  getProposalDetail(address: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/proposals/${address}`);
  }
  //---USER--------
  
  getUserByWallet(): Observable<any> {
    alert(`${this.apiUrl}/users/${this.metamasService.currentAccount()}`);
    return this.http.get(`${this.apiUrl}/users/${this.metamasService.currentAccount()}`);
  }
}