import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent {

  user?: any;
  userAddress: any;
  campaigns?: any[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private apiService: ApiService,
    private router: Router) {
  }

  async ngOnInit() {
    this.userAddress = this.route.snapshot.paramMap.get('address') ?? "";
    this.getUserDetail(this.userAddress);
    this.getUserCampaigns();
  }

  getUserCampaigns(): void {
    console.log(this.userAddress);
    this.apiService.getUserCampaigns(this.userAddress).subscribe({
      next: (response) => {
        console.log(response)
        this.campaigns = response
      },
      error: (error) => {
        console.error('Error fetching user campaigns:', error);
      }
    });
  }

  getUserDetail(address:string): void {
    this.userService.getUserByWallet(address).subscribe({
      next: (response: any) => {
        this.user = response;
      },
      error: (error: any) =>  {
        console.error('Error fetching user:', error);
      }
    });
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
