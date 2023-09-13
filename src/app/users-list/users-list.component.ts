import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {

  users?: any[];

  constructor(
    private UserService: UserService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.getUsers()
  }

  getUsers(): void {
    this.UserService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) =>  {
        console.error('Error fetching ended proposals:', error);
      }
    });
  }

  userDetail(address: string): void {
    this.router.navigate(['/users', address]);
  }


}
