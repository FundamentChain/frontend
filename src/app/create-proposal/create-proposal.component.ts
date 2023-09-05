import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.css']
})
export class CreateProposalComponent implements OnInit {
  fee: number = 1;
  campaignReceiver: string = '';
  campaignIpfs: string = '';
  amountRequesting: number = 0;
  campaignEndTime: number = 0; // Assuming campaignEndTime is in hours


  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.campaignReceiver = queryParams['admistrator'] || '';
      this.campaignReceiver = queryParams['receiver'] || '';
    });
  }

  submitProposal() {
    // Amount must be greater than 0
    //Campaign End Time must be between 6 and 720 hours (30 days)
    // Fee based on time alive and amount 

    // Continue with the form submission or other actions
    console.log('Form submitted with valid data');
    const campaignInfo = {
      fee: this.calculateFee(),
      campaignIpfs: this.campaignIpfs,
      amountRequesting: this.amountRequesting,
      // 1 hour = 3600 seconds
      campaignEndTime: Date.now() + this.campaignEndTime * 3600
    }
    return campaignInfo;
  }
  // Auto fee calculation example
  calculateFee() {
    const maxAmount = 100; // Maximum value for amountRequesting
    const maxCampaignEndTime = 720; // Maximum value for campaignEndTime
    const maxFee = 10; // Maximum fee
    const minFee = 1; // Minimum fee
  
    // Calculate fee based on the formula
    const amountRatio = this.amountRequesting / maxAmount;
    const timeRatio = this.campaignEndTime / maxCampaignEndTime;
  
    // Combine the two ratios to calculate the fee
    const fee = minFee + (maxFee - minFee) * (1 - amountRatio) * (1 - timeRatio);
  
    // Ensure the fee is within the valid range
    this.fee = Math.floor(this.fee);
    this.fee = Math.max(minFee, Math.min(maxFee, fee));
  }
}
