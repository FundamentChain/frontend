import { Component, effect } from '@angular/core';
import { MetamaskService } from './services/metamask.service';
import { AlchemyService } from './services/alchemy.service';
import { TokenBalance } from 'alchemy-sdk';
import { FormControl, Validators } from '@angular/forms';

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
  title = 'w3fs-frontend';
  currentChainId = this.metamaskService.currentChainId;
  currentAccount = this.metamaskService.currentAccount;
  balance = this.metamaskService.balance;
  hasMetamask;
  tokenBalances: TokenBalance[] = [];
  message = new FormControl('', Validators.required);
  signatures: string[] = [];

  constructor(
    private metamaskService: MetamaskService,
    private alchemyService: AlchemyService
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

  signMessage() {
    const message = this.message.value!;
    this.metamaskService.signer?.signMessage(message).then((signature) => {
      this.signatures.push(signature);
    });
  }
}
