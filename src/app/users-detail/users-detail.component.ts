import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent {

  user?: any;
  userAddress: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService) {
  }

  async ngOnInit() {
    this.userAddress = this.route.snapshot.paramMap.get('address') ?? "";
    this.getUserDetail(this.userAddress);
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

}
