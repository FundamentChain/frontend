import { Injectable, effect } from '@angular/core';
import { ethers } from 'ethers';
import { MetamaskService } from '../services/metamask.service';
import { AlchemyService } from '../services/alchemy.service';
import donationPlatform from "../../assets/contracts/DonationPlatformContract.json";
import donationContract from "../../assets/contracts/DonationContract.json"

@Injectable({
  providedIn: 'root'
})
export class ContractServiceService {

  provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  signer = this.provider.getSigner();
  currentChainId = this.metamaskService.currentChainId;
  currentAccount = this.metamaskService.currentAccount;
  balance = this.metamaskService.balance;
  hasRole: boolean = false;

  contract = new ethers.Contract("0x92D001feCB274E5c5578BaBe9358c688C97d1aDd", donationPlatform.abi, this.signer);
  proposalContract = new ethers.Contract("0x92D001feCB274E5c5578BaBe9358c688C97d1aDd", donationContract.abi, this.signer);

  constructor (
    private metamaskService: MetamaskService,
    private alchemyService: AlchemyService) {

      effect(async () => {
        // try 
        const campaignCreator =  await this.contract.CAMPAIGN_CREATOR()
        this.hasRole = await this.contract.hasRole(campaignCreator, this.signer._address);
      });
  }

  async createProposal(
    proposalName: string,
    amountRequested: string,
    timestamp: string,
    category: string,
    description: string,
  ) {
    const reciever =  this.currentAccount();

    const amountNumber = Number(amountRequested)
    const timestampNumber = Number(timestamp)

    try {
      const tx = await this.contract.createCampaign(
        this.signer.getAddress(),
        "",
        amountNumber,
        timestampNumber
      );
      alert("fdsg")
      await tx.wait();
      return tx.hash; 
    }

    catch{
      alert("Error occured during the transaction! Confirm input")
      return "Error"
    }
  }

  async updateBalance(proposalAddress: string): Promise<number | string> {
    try {
      const missingBalance = await this.proposalContract.attach(proposalAddress).missingBalanceToTarget();
      return missingBalance;
    }
    catch {
        alert("Error occured during the transaction! Confirm input")
        return "Error"
    }
  }

}
