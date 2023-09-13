
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MetamaskService } from '../services/metamask.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: any;

  constructor(
    private userService: UserService,
    private metamaskService: MetamaskService
  ) { }

  ngOnInit(): void {
    this.fetchUserData();
  }

  async fetchUserData() {
    const wallet = await this.metamaskService.currentAccountCorreta();
    if (wallet) {
      this.userService.getUserByWallet(wallet).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (error) => {
          console.error("Failed to fetch user data:", error);
          // You can add more error handling logic here, for instance, showing a user-friendly error message
        }
      });
    }
  }
}

export default PerfilComponent;
