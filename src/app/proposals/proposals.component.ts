import { Component, OnInit, effect } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css'],
})

export class ProposalsComponent implements OnInit {
  openProposals?: any[];
  endedProposals?: any[];

  constructor(private apiService: ApiService) {
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
        this.openProposals = response;
      },
      error: (error) => {
        console.error('Error fetching open campaign:', error);
      }
    });
  }
  getEndedProposals(): void {
    this.apiService.getEndedProposals().subscribe({
      next: (response) => {
        this.endedProposals = response;
      },
      error: (error) =>  {
        console.error('Error fetching ended campaign:', error);
      }
    });
  }

  getProposalDetail(address: string): void {
    this.apiService.getProposalDetail(address).subscribe({
      next: (response) => {
        this.endedProposals = response;
      },
      error: (error) =>  {
        console.error('Error fetching ended campaign:', error);
      }
    });
  }
}

export default ProposalsComponent;