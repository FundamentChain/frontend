import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MetamaskService } from '../services/metamask.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  openProposals?: any[];
  endedProposals?: any[];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private mService: MetamaskService) {
    this.openProposals = [];
    this.endedProposals = [];
  }

  ngOnInit(): void {
    this.getOpenProposals();
    this.getEndedProposals();
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

  getEndedProposals(): void {
    this.apiService.getEndedProposals().subscribe({
      next: (response) => {
        this.endedProposals = response;
      },
      error: (error) =>  {
        console.error('Error fetching ended proposals:', error);
      }
    });
  }

  proposalDetail(address: string): void {
    this.router.navigate(['/proposal-details', address]);
  }

}
