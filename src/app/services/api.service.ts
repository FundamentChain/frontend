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

  getOpenCampaigns(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/campaigns/open`);
  }

  getEndedCampaigns(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/campaigns/closed`);
  }

  getCampaignDetail(address: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/campaigns/detail/${address}`);
  }

  getUserCampaigns(address: string | null): Observable<any[]> {
    console.log(`${this.apiUrl}/campaigns/users${address}`);
    return this.http.get<any[]>(`${this.apiUrl}/campaigns/user/${address}`);
  }

  putCloseCampaign(campaignAddress: string | null): void {
    this.http.put(`${this.apiUrl}/campaigns/close`, {"address": campaignAddress}, this.httpHeader);
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
    return this.http.post<string>(`${this.apiUrl}/campaigns/create`, body, this.httpHeader);
  }

  getUserByWallet(wallet: string): Observable<User> {
    const url = `${this.baseUrl}/${wallet}`;
    return this.http.get<User>(url);
  }
  


}