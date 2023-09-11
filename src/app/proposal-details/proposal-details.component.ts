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

  missingBalance: any = 0;
  open: any = false;
  justClosed: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private contract: ContractServiceService) {
  }

  async ngOnInit() {
    this.contractAddress = this.route.snapshot.paramMap.get('address') ?? "";
    this.getProposalDetail(this.contractAddress);
    this.missingBalance = await this.contract.getMissingBalance(this.contractAddress);
    this.raisedPercentage = Math.round((this.proposal.amountRequested - this.missingBalance) / this.proposal.amountRequested * 100);
    this.open = await this.contract.getCampaignOpen(this.contractAddress);

    if (this.missingBalance == 0) {
      console.log("why")
      this.apiService.putCloseCampaign(this.contractAddress);
      this.justClosed = true;
    }

    /* GONÇALO
     if (this.proposal.open) {
      this.getNewBalance();
    }
    else {this.missingBalance = 0;}
  } */

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

  async donate(amount: string) {
    const amountNumber = BigInt(Number(amount))
    try {
      if (this.proposal.open) {
        this.contract.donate(this.contractAddress, amountNumber);
      }
      else {
        console.log("Campaign already closed");
      }
    }
    catch {
      console.log("API connection error")
    }
  }

  /*
  private async getNewBalance(): Promise<number> {
    try {
      console.log("hello")
      const missingBalance: number | string = await this.contract.updateBalance(this.contractAddress);
      console.log(missingBalance);
      if (typeof missingBalance === 'string') {
        console.error("Error occurred during the transaction:", missingBalance);
        return 0;
      } else {
        if (missingBalance == 0) {
          this.apiService.putCloseCampaign(this.contractAddress);
          this.justClosed = true;
        }
        return missingBalance;
      }
    } catch (error) {
      console.error("Error occurred during the transaction:", error);
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

  */
    
}
