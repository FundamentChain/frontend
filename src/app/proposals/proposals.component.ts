import { Component, OnInit, effect } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MetamaskService } from '../services/metamask.service';

@Component({
  selector: 'proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css'],
})

export class ProposalsComponent implements OnInit {
  openProposals?: any[];
  endedProposals?: any[];

  constructor(private apiService: ApiService,
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