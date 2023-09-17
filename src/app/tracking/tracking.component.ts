import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})

export class TrackingComponent {
  endedCampaigns?: any[];

  constructor(
    private apiService: ApiService,
    private router: Router) {
    this.endedCampaigns = [];
  }

  ngOnInit(): void {
    this.getEndedProposals();
  }

  getEndedProposals(): void {
    this.apiService.getEndedCampaigns().subscribe({
      next: (response) => {
        this.endedCampaigns = response;
      },
      error: (error) =>  {
        console.error('Error fetching ended proposals:', error);
      }
    });
  }

  campaignDetail(address: string): void {
    this.router.navigate(['/tracking', address]);
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
