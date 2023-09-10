import { Component, OnInit } from '@angular/core';
import { ContractServiceService } from '../services/contract-service.service';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-proposal-details',
  templateUrl: './proposal-details.component.html',
  styleUrls: ['./proposal-details.component.css']
})
export class ProposalDetailsComponent implements OnInit {
  campaignAddress: string = '';
  missingBalance: number = 0;
  open: boolean = true; 
  justClosed: boolean = false;

  constructor(
    private contractService: ContractServiceService,
    private apiService: ApiService
  ) {
    
    //this.campaignAddress = campaignAddress;
    //this.open = open
  }

  ngOnInit(): void {
    if (this.open) {
      this.getNewBalance();
    }
    else {this.missingBalance = 0;}
  }

  private async getNewBalance(): Promise<number> {
    try {
      const missingBalance: number | string = await this.contractService.updateBalance(this.campaignAddress);
      if (typeof missingBalance === 'string') {
        // Handle error message
        console.error("Error occurred during the transaction:", missingBalance);
        return 0;
      } else {
        // Handle successful balance update
        if (missingBalance == 0) {
          // close campaign 
          this.apiService.putCloseCampaign(this.campaignAddress);
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
