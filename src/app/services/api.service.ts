import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MetamaskService } from './metamask.service';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { MetamaskService } from './metamask.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
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

  putCloseCampaign(campaignAddress: string): void {
    const body = {campaignAddress};
    this.http.put<string>(`${this.apiUrl}/proposals/todo`, body);
  }

  putCreateCampaign(
    proposalName: string,
    amountRequested: string,
    timestamp: string,
    category: string,
    description: string
  ): Observable<string> {
    const body = {
      proposalName,
      amountRequested,
      timestamp,
      category,
      description
    };
    return this.http.put<string>(`${this.apiUrl}/proposals/create_proposal`, body);
  }

  // USERS
  getUserByWallet(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${this.metamasService.currentAccount()}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

}
