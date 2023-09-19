import { Component, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ContractServiceService } from '../services/contract-service.service';
import { MetamaskService } from '../services/metamask.service';

@Component({
  selector: 'app-proposal-details',
  templateUrl: './proposal-details.component.html',
  styleUrls: ['./proposal-details.component.css']
})
export class ProposalDetailsComponent {

  // Campaign variables
  campaign?: any;
  contractAddress: any;
  contractOpen: any = false;
  donationResult: string = "";
  userDonations: string = "";

  // Close and time variable
  readyToClose: any = false;
  missingBalance: any = 0;
  countdown: string = "";
  countdownSeconds: number = 0;
  countdownEvent: any;

  // others
  raisedPercentage = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public contract: ContractServiceService,
    private metamaskService: MetamaskService) {
  }

  async ngOnInit() {
    this.contractAddress = this.route.snapshot.paramMap.get('address') ?? "";
    this.getCampaignDetail(this.contractAddress);
    this.getUserDonations();
  }

  // Get information on the campaign (API)
  getCampaignDetail(address: string): void {
    this.apiService.getCampaignDetail(address).subscribe({
      next: (response) => {
        this.campaign = response;
        this.checkCloseByMaxBalance();
        this.updateCountdown();
        this.countdownEvent = setInterval(() => this.updateCountdown(), 1000);
      },
      error: (error) =>  {
        console.error('Error fetching ended proposals:', error);
      }
    });
  }

  // Get the amount the user as donated (Contract)
  async getUserDonations() {
    try {
      this.userDonations = await this.contract.userDonations(
        this.contractAddress,
        await this.metamaskService.currentAccountCorreta() ?? ""
      );
    } catch (error) {
      console.error("Error fetching user donations:", error);
    }
  }
  
  // Donate to the campaign (Contract)
  async donate(amount: string) {
    const amountInWEI = BigInt(this.contract.convertToWEI(Number(amount)));
    this.checkCloseByMaxBalance();
    if (this.missingBalance == 0) {
      this.donationResult =  "Sorry, someone has donated, and the campaign reached its limit!";
      return this.donationResult;
    }
    if (this.missingBalance < amountInWEI) {
      this.donationResult =  "Sorry, someone has donated, and your donation amount exceeds the limit!";
      return this.donationResult;
    }
    const hash = await this.contract.donate(this.contractAddress, amountInWEI);
    this.donationResult = `Thank you for the donation, here is the transaction hash: ${hash}`;
    return this.donationResult;
  }

  // Close campaign - Triggered by click (Contract)
  async closeCampaign() {
    const message = await this.contract.closeCampaign(this.contractAddress);
    if (message == "Closed Campaign Successfully") {
      this.apiService.putCloseCampaign(this.contractAddress);
    }
    return message;
  }

  // Update variables related to close
  async checkCloseByMaxBalance(): Promise<void> {
    this.missingBalance = await this.contract.getMissingBalance(this.contractAddress);
    this.raisedPercentage = Math.round(
      (this.campaign.amountRequested - this.missingBalance) 
      / this.campaign.amountRequested * 100);
    
    this.contractOpen = await this.contract.getCampaignOpen(this.contractAddress);
    if (this.contractOpen) {
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

  // Get time to campaign close
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
