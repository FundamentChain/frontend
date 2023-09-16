import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';
  private baseUrl = 'http://localhost:3000/users';
  
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

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
    console.log(`closing ${this.apiUrl}/proposals/close_proposal`);
    this.http.put(`${this.apiUrl}/proposals/close_proposal`, {"address": campaignAddress}, this.httpHeader);
  }

  postCreateCampaign(
    receiverAddress: string | null,
    ipfsCid: string | null,
    title: string,
    description: string,
    endTime: number,
    amountRequested: number,
  ): Observable<string> {
    const body = {
      "receiverAddress": receiverAddress,
      "ipfsCid": ipfsCid,
      "title": title,
      "description": description,
      "endTime": endTime,
      "amountRequested": amountRequested
    };
    console.log(body);
    return this.http.post<string>(`${this.apiUrl}/proposals/create_proposal`, body, this.httpHeader);
  }

  getUserByWallet(wallet: string): Observable<User> {
    const url = `${this.baseUrl}/${wallet}`;
    return this.http.get<User>(url);
  }
  


}