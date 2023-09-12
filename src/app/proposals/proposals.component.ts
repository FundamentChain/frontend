import { Component, OnInit, effect } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css'],
})

export class ProposalsComponent implements OnInit {
  
  openProposals?: any[];

  constructor(
    private apiService: ApiService,
    private router: Router) {
    this.openProposals = [];
  }

  ngOnInit(): void {
    this.getOpenProposals();
  }

  getOpenProposals(): void {
    this.apiService.getOpenProposals().subscribe({
      next: (response) => {
        this.openProposals = response
      },
      error: (error) => {
        console.error('Error fetching open proposals:', error);
      }
    });
  }

  proposalDetail(address: string): void {
    this.router.navigate(['/proposal-details', address]);
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