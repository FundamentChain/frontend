import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MetamaskService } from '../services/metamask.service';

@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.css']
})
export class CreateProposalComponent {

  hash: string = ''

  constructor (
    private apiService: ApiService, 
    private metamaskService: MetamaskService) {}

  async createProposal(
    title: string,
    description: string,
    endTime: string,
    amountRequested: string,
    ): Promise<void> {
      const address = await this.metamaskService.currentAccountCorreta();
      this.apiService.postCreateCampaign(
        address,
        title,
        description,
        Number(endTime),
        Number(amountRequested)
      ).subscribe({
        next: (response) => {
          this.hash = response;
          console.error('Hash:', this.hash);
        },
        error: (error) =>  {
          console.error('Error creating proposal:', error);
          this.hash = error;
        }
      });
    }
}
