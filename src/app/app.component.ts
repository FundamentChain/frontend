import { MetamaskService } from './services/metamask.service';
import { AlchemyService } from './services/alchemy.service';
import { Component, effect } from '@angular/core';
import { TokenBalance } from 'alchemy-sdk';
import { ethers } from 'ethers';
import donationPlatform from 'src/assets/contracts/DonationPlatformContract.json';
import donationContract from 'src/assets/contracts/DonationContract.json';
import { Router } from '@angular/router';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // general info 
  title = 'Donations Dapp';
  contractAddress = "0x43E6314DC236D288a55c62a6025c117901E09E75";
  contract = new ethers.Contract(this.contractAddress, donationPlatform.abi)
  
  // network info 
  provider = new ethers.providers.Web3Provider(window.ethereum, "any");  /// ver na nova versão
  currentChainId = this.metamaskService.currentChainId;
  currentAccount = this.metamaskService.currentAccount;

  // mongoose database
  proposal: any; 
  admistrator: string = ''; 

  // user info 
  signer = this.provider.getSigner();
  balance = this.metamaskService.balance;
  tokenBalances: TokenBalance[] = [];
  hasMetamask;
  
  constructor(
    private metamaskService: MetamaskService,
    private alchemyService: AlchemyService,
    private router: Router
  ) {
    this.hasMetamask = metamaskService.checkMetamaskAvailability();
    if (this.hasMetamask) {
      metamaskService.retrieveConnection();
    }
    effect(async () => {
      if (this.currentAccount()) {
        this.tokenBalances = await this.alchemyService.getTokenBalances(
          this.currentAccount()
        );
      }
    });
  }


  ngOnInit() {
    // load live proposals (from our mongoose database)

    //
  }

  connectWallet() {
     this.metamaskService.connectWallet();

    if (this.currentAccount) {
      const account = this.currentAccount();
      const existsInDB =  this.metamaskService.checkWalletInDB(account);
      
      if (!existsInDB) {
         this.metamaskService.createProfileForWallet(account);
        // Handle what to do after creating the profile, maybe notify the user or redirect them
      }
      
      // Logic for when the wallet exists in the database (like loading user data or redirecting)
    }
  }

  async getProposal(address: string, index: number) {
    const campaign = await this.contract.getReceiverCampaignByIndex(address, index);
    console.log("Hello")
    console.log(campaign)
    return campaign;
  }

  createProposal() {
      this.router.navigate(['/create_proposal'], 
      { queryParams: { receiver: this.currentAccount, admistrator: this.admistrator} });
  }

}
