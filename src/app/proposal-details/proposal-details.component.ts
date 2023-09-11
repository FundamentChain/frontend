import { Component, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ContractServiceService } from '../services/contract-service.service';
import donationContract from "../../assets/contracts/DonationContract.json"
import { ethers } from 'ethers';



@Component({
  selector: 'app-proposal-details',
  templateUrl: './proposal-details.component.html',
  styleUrls: ['./proposal-details.component.css']
})
export class ProposalDetailsComponent {

  proposal?: any;
  raisedPercentage = 0;
  contractAddress: any;

  missingBalance: number = 0;
  justClosed: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private contract: ContractServiceService) {
  }

  ngOnInit() {
    this.contractAddress = this.route.snapshot.paramMap.get('address') ?? "";
    this.getProposalDetail(this.contractAddress);

    if (this.proposal.open) {
      this.getNewBalance();
    }
    else {this.missingBalance = 0;}
  }

  getProposalDetail(address:string): void {
    this.apiService.getProposalDetail(address).subscribe({
      next: (response) => {
        this.proposal = response[0];
      },
      error: (error) =>  {
        console.error('Error fetching ended proposals:', error);
      }
    });
  }

  private async getNewBalance(): Promise<number> {
    try {
      const missingBalance: number | string = await this.contract.updateBalance(this.contractAddress);
      if (typeof missingBalance === 'string') {
        // Handle error message
        console.error("Error occurred during the transaction:", missingBalance);
        return 0;
      } else {
        // Handle successful balance update
        if (missingBalance == 0) {
          // close campaign 
          this.apiService.putCloseCampaign(this.contractAddress);
          // disable donations 
          this.justClosed = true;
        }
        return missingBalance;
      }
    } catch (error) {
      console.error("Error occurred during the transaction:", error);
      // You can also display an error message to the user here if needed.
      return 0;
    }
  }

  stillSameBalance() {
    this.getNewBalance().then((newBalance) => {
      const sameBalance = this.missingBalance == newBalance;
      this.missingBalance = newBalance;
      return sameBalance;
    });
  }

}
