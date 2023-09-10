import { Component, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ContractServiceService } from '../services/contract-service.service';


@Component({
  selector: 'app-proposal-details',
  templateUrl: './proposal-details.component.html',
  styleUrls: ['./proposal-details.component.css']
})
export class ProposalDetailsComponent {

  proposal?: any;
  raisedPercentage = 25;
  amountLeft: any;
  contractAddress: any;
  
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private contract: ContractServiceService) {
  }

  ngOnInit() {
    this.contractAddress = this.route.snapshot.paramMap.get('address') ?? "";
    this.getProposalDetail(this.contractAddress);
    this.amountLeft = this.getAmountLeft()
  }

  getProposalDetail(address:string): void {
    this.apiService.getProposalDetail(address).subscribe({
      next: (response) => {
        console.log(response[0]);
        this.proposal = response[0];
      },
      error: (error) =>  {
        console.error('Error fetching ended proposals:', error);
      }
    });
  }

  async getAmountLeft() {
    try {
      const amount = await this.contract.amountLeft(this.contractAddress);
      console.log(amount)
      this.amountLeft = amount ?? 0;
      console.log(this.amountLeft)
    } catch (error) {
      console.error('Error while fetching amount left:', error);
      this.amountLeft = 0;
    }
  }

}
