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

  campaign?: any;
  contractAddress: any;
  contractOpen: any = false; // campaign closed in contract
  readyToClose: any = false;  // campaign ready to close 

  // variables to check when to close
  missingBalance: any = 0;
  countdown: string = ""; // campaign ended
  countdownSeconds: number = 0;
  countdownEvent: any;

  // others
  raisedPercentage = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private contract: ContractServiceService) {
  }

  async ngOnInit() {
    this.contractAddress = this.route.snapshot.paramMap.get('address') ?? "";
    this.getCampaignDetail(this.contractAddress);
  }

  getCampaignDetail(address:string): void {
    this.apiService.getCampaignDetail(address).subscribe({
      next: (response) => {
        this.campaign = response;

        // set the rest of tasks 
        this.checkCloseByMaxBalance();
        this.updateCountdown();
        this.countdownEvent = setInterval(() => this.updateCountdown(), 1000);
      },
      error: (error) =>  {
        console.error('Error fetching ended proposals:', error);
      }
    });
  }

  // Only visible if campaign is open
  async donate(amount: string) {
    const amountNumber = BigInt(Number(amount));
    this.checkCloseByMaxBalance();
    if (this.missingBalance == 0) {
      return "Sorry, someone has donated, and the campaign reached its limit!";
    }
    if (this.missingBalance < amountNumber) {
      return "Sorry, someone has donated, and your donation amount exceeds the limit!";
    }
    return this.contract.donate(this.contractAddress, amountNumber);
  }

  // Triggered when button clicked
  // Button enabled if countdown == 0 or this.missingBalance == 0
  async closeCampaign() {
    const message = await this.contract.closeCampaign(this.contractAddress);
    if (message == "Closed Campaign Successfully") {
      // get updated proposal
      this.apiService.putCloseCampaign(this.contractAddress);
    }
    return message;
  }

  // Updates variables and returns true if donation can proceed
  async checkCloseByMaxBalance(): Promise<void> {
    this.missingBalance = await this.contract.getMissingBalance(this.contractAddress);
    // if (typeof this.missingBalance == 'string') {return 'Error'} // assert 

    this.raisedPercentage = Math.round(
      (this.campaign.amountRequested - this.missingBalance) 
      / this.campaign.amountRequested * 100);
    
    this.contractOpen = await this.contract.getCampaignOpen(this.contractAddress);
    if (this.contractOpen){
      this.readyToClose = this.missingBalance == 0 || this.countdownSeconds <= 0;
    }
    else {
      clearInterval(this.countdownEvent);
      if (this.campaign.open) {
        console.log('tried closing');
        this.apiService.putCloseCampaign(this.contractAddress);
      }
    }
  }

    // Countdown to bets closed
    updateCountdown() {
      this.countdownSeconds = Math.floor(Number(this.campaign.endTime) - Number(Date.now()) / 1000);
      if (this.countdownSeconds <= 0) {
        this.checkCloseByMaxBalance();
        clearInterval(this.countdownEvent);
      } else {
        const days = Math.floor(this.countdownSeconds / 86400); // 86400 seconds in a day
        const hours = Math.floor((this.countdownSeconds % 86400) / 3600);
        const minutes = Math.floor((this.countdownSeconds % 3600) / 60);
        const seconds = Math.floor(this.countdownSeconds % 60);
        this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
    }

}
