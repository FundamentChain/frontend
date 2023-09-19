import { Injectable, effect } from '@angular/core';
import { ethers } from 'ethers';
import { MetamaskService } from '../services/metamask.service';
import donationPlatform from "../../assets/contracts/DonationPlatform.json";
import donationContract from "../../assets/contracts/DonationContract.json"

const DONATION_PLATFORM_CONTRACT = "0xa4a9A13c7D6Db21A03E66CA2Ca550238350DC3c5"
const DONATION_CONTRACT_EXAMPLE = "0x9B2d64F9659BEce540BB1741537dbcADcaD85394"


@Injectable({
  providedIn: 'root'
})
export class ContractServiceService {

  provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  signer = this.provider.getSigner();
  currentChainId = this.metamaskService.currentChainId;
  currentAccount = this.metamaskService.currentAccount;
  balance = this.metamaskService.balance;

  // platform contract 

  // platform contract 
  hasRole: boolean = false;
  platformContract = new ethers.Contract(DONATION_PLATFORM_CONTRACT, donationPlatform.abi, this.signer);
  
  // proposal contract 
  proposalContract = new ethers.Contract(DONATION_CONTRACT_EXAMPLE, donationContract.abi, this.signer);
  donationAmount: number  = 0;

  constructor (
    private metamaskService: MetamaskService) {
      effect(async () => {
        const campaignCreator =  await this.platformContract.CAMPAIGN_CREATOR()
        this.hasRole = await this.platformContract.hasRole(campaignCreator, this.signer._address);
      }
    );
  }

  async closeCampaign(proposalAddress: string): Promise<string> {
    try {
      const contract = this.proposalContract.attach(proposalAddress);
      const tx = await contract.closeCampaign();
      return "Closed Campaign Successfully"
    } 
    catch (error) {
      console.error("Error:", error);
      return "Cant be closed yet";
    }
  }

  // Campaign Contract 
  async donate(proposalAddress: string, amount: bigint): Promise<string> {
    try {
      const contract = this.proposalContract.attach(proposalAddress);
      const tx = await contract.donate({value: amount.toString()});
      await tx.wait();
      console.log("Transaction hash:", tx.hash);
      return tx.hash;
    }
    catch (error) {
      console.error("Error:", error);
      return "Error. Inssuficient Funds or Excceded amout Requested"
    }
  }

  async userDonations(proposalAddress: string, userAddress: string): Promise<string> {
    try {
      const contract = this.proposalContract.attach(proposalAddress);
      return await contract.donations(userAddress).toString();
    } 
    catch (error) {
      console.error("Error:", error);
      return "Error fetching user donations."
    }
  }

  async getCampaignOpen(proposalAddress: string): Promise<boolean | string> {
    try {
      return await this.proposalContract.attach(proposalAddress).campaignOpen();
    }
    catch {
        return "Error. Probaly invalid address"
    }
  }

  async getMissingBalance(proposalAddress: string): Promise<number | string> {
    try {
      const missingBalance = await this.proposalContract.attach(proposalAddress).missingBalanceToTarget();
      return missingBalance.toNumber();
    }
    catch {
        return "Error. Probaly invalid address"
    }
  }

  // utils 
  convertToETH(amount: number) {
    return Number(ethers.utils.formatUnits(amount.toString(), "ether"));
  }

  convertToWEI(amount: number) {
    return Number(ethers.utils.parseEther(amount.toString()));
  }

}