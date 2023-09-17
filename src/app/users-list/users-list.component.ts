import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { IpfsService } from '../services/ipfs.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {

  users?: any[] = [];
  images: string[] = [];

  constructor(
    private UserService: UserService,
    private ipfsService: IpfsService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.getUsers();
  }

  async getUsers(): Promise<void> {
    this.UserService.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  userDetail(address: string): void {
    this.router.navigate(['/users', address]);
  }

}
