import { MetamaskService } from './services/metamask.service';
import { AlchemyService } from './services/alchemy.service';
import { ContractServiceService } from './services/contract-service.service';
import { Component, effect } from '@angular/core';
import { TokenBalance } from 'alchemy-sdk';
import { ethers } from 'ethers';
import { HttpClient } from '@angular/common/http';
import { User } from './services/user.model';
import { ApiService } from './services/api.service';


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
  userMenu?: User;  

  private apiUrl = 'http://localhost:3000/api';
  

  constructor(
    private http: HttpClient,
    private metamaskService: MetamaskService,
    private alchemyService: AlchemyService,
    private contractService: ContractServiceService,
    private apiService: ApiService
  ) {
    this.userMenu = {} as User;

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

    effect(async () => {
      if (this.currentAccount()) {
        this.user = this.getUser(this.currentAccount())
      }
    });
  }

  ngOnInit(): void {
    this.apiService.getUserByWallet().subscribe({
      next: (data) => {
        this.userMenu = data;
      },
      error: (error) => {
        console.error('Error fetching open proposals:', error);
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
      }
    }
  }

  getUser(address: string) {
    return this.http.get<any>(`${this.apiUrl}/user/${address}`);
  }

}
