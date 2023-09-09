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
    this.apiService.getOpenProposals().subscribe(
      (response) => {
        this.openProposals = response;
      },
      (error) => {
        console.error('Error fetching open proposals:', error);
      }
    );
  }

  getEndedProposals(): void {
    this.apiService.getEndedProposals().subscribe(
      (response) => {
        this.endedProposals = response;
      },
      (error) => {
        console.error('Error fetching ended proposals:', error);
      }
    );
  }
}

export default ProposalsComponent;