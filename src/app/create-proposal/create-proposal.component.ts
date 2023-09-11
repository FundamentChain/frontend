import { Component, effect } from '@angular/core';
import { ContractServiceService } from '../services/contract-service.service';

@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.css']
})
export class CreateProposalComponent {

  constructor (
    private ContractService: ContractServiceService,
  ) {}

  async createProposal(
    proposalName: string,
    amountRequested: string,
    timestamp: string,
    category: string,
    description: string,
  ) { 
    console.log([proposalName, amountRequested, timestamp, category, description]);
    this.ContractService.createProposal(
      proposalName,
      amountRequested,
      timestamp,
      category,
      description)
  }
  

}
