import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.css']
})
export class CreateProposalComponent {

  hash: string = ''

  constructor (private apiService: ApiService) {}

  createProposal(
    proposalName: string,
    amountRequested: string,
    timestamp: string,
    category: string,
    description: string,
<<<<<<< HEAD
  ) { 
    console.log([proposalName, amountRequested, timestamp, category, description]);
    this.ContractService.createProposal(
      proposalName,
      amountRequested,
      timestamp,
      category,
      description)
  }
  

=======
    ): void {
      this.apiService.putCreateCampaign(
        proposalName,
        amountRequested,
        timestamp,
        category,
        description
      ).subscribe({
        next: (response) => {
          this.hash = response;
        },
        error: (error) =>  {
          console.error('Error creating proposal:', error);
        }
      });
    }
>>>>>>> 6c040302579fd791b9e665a55a82f0c4c664a3ee
}
