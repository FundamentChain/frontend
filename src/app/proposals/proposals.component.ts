import { Component, OnInit, effect } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ContractServiceService } from '../services/contract-service.service';

@Component({
  selector: 'proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css'],
})

export class ProposalsComponent implements OnInit {
  
  openCampaigns?: any[];

  constructor(
    private apiService: ApiService,
    public contract: ContractServiceService,
    private router: Router) {
    this.openCampaigns = [];
  }

  ngOnInit(): void {
    this.getOpenCampaigns();
  }

  getOpenCampaigns(): void {
    this.apiService.getOpenCampaigns().subscribe({
      next: (response) => {
        this.openCampaigns = response
      },
      error: (error) => {
        console.error('Error fetching open proposals:', error);
      }
    });
  }

  campaignDetail(address: string): void {
    this.router.navigate(['/campaign-details', address]);
  }

  timestampToDate(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };
    return date.toLocaleString('en-US', options);
  }

}