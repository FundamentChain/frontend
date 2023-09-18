
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MetamaskService } from '../services/metamask.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: any;
  campaigns: any[] = [];

  constructor(
    private userService: UserService,
    private metamaskService: MetamaskService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchUserData();
    this.getUserCampaigns();
  }

  async fetchUserData() {
    const wallet = await this.metamaskService.currentAccountCorreta();
    console.log(wallet);
    if (wallet) {
      this.userService.getUserByWallet(wallet).subscribe({
        next: (data) => {
          console.log(data)
          this.user = data
        },
        error: (error) => {
          console.log(error);
          console.error("Failed to fetch user data:", error);
        }
      });
    }
  }

  async getUserCampaigns(): Promise<void> {
    this.apiService.getUserCampaigns(await this.metamaskService.currentAccountCorreta()).subscribe({
      next: (response) => {
        console.log(response)
        this.campaigns = response
      },
      error: (error) => {
        console.error('Error fetching user campaigns:', error);
      }
    });
  }

  async createUser() {
    const wallet = this.metamaskService.currentAccountCorreta();
    if (wallet != null) {
      this.userService.createUser(await this.metamaskService.currentAccountCorreta() ?? "").subscribe({
        next: () => {
          console.log("User created");
          this.router.navigate(['/perfil']);
        },
        error: () => {
          console.log("Error creationg user")
        }
      })
    }
  }

  campaignDetail(address: string): void {
    this.router.navigate(['/campaign-details', address]);
  }

  timestampToDate(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };
    return date.toLocaleString('en-US', options);
  }

}

export default PerfilComponent;
