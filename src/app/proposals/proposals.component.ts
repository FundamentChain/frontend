import { HttpClient } from '@angular/common/http';
import { Component, OnInit, effect } from '@angular/core';
import { MetamaskService } from '../services/metamask.service';
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
        console.log(response); // This will log the data received from the API
        console.log(response[0]); // You can access elements if 'data' is an array
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
}

export default ProposalsComponent;