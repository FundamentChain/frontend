import { MetamaskService } from './services/metamask.service';
import { AlchemyService } from './services/alchemy.service';
import { Component, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenBalance } from 'alchemy-sdk';
import { ethers } from 'ethers';
import { UserService } from './services/user.service';
import { IpfsService } from './services/ipfs.service';


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
  title = 'Donations Dapp';
  provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  signer = this.provider.getSigner();
  currentChainId = this.metamaskService.currentChainId;
  currentAccount = this.metamaskService.currentAccount;
  balance = this.metamaskService.balance;
  tokenBalances: TokenBalance[] = [];
  user: any;
  hasMetamask;
  hasKyc: boolean = false;

  constructor(
    private userService: UserService,
    private metamaskService: MetamaskService,
    private alchemyService: AlchemyService,
    private ipfsService: IpfsService
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
    this.fetchUserData();
  }

  connectWallet() {
     this.metamaskService.connectWallet();
  }

  async fetchUserData() {
    const wallet = await this.metamaskService.currentAccountCorreta();
    if (wallet) {
      this.userService.getUserByWallet(wallet).subscribe({
        next: (data: any) => {
          this.user = data;
        },
        error: (error: any) => {
          console.error("Failed to fetch user data:", error);
        }
      });
    }
  }

}