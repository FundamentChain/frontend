import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getOpenProposals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/proposals/live_proposals`);
  }

  getEndedProposals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/proposals/ended_proposals`);
  }

  putCloseCampaign(campaignAddress: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/proposals/ended_proposals`);
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
    // should return hash 
    return this.http.put<string>(`${this.apiUrl}/proposals/create_proposal`, body);
  }
  
}
