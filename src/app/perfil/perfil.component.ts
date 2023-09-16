
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MetamaskService } from '../services/metamask.service';
import { IpfsService } from '../services/ipfs.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: any;
  profilePictureUrl = "";

  constructor(
    private userService: UserService,
    private metamaskService: MetamaskService,
    private ipfsService: IpfsService
  ) { }

  ngOnInit(): void {
    this.fetchUserData();
  }

  async fetchUserData() {
    const wallet = await this.metamaskService.currentAccountCorreta();
    if (wallet) {
      this.userService.getUserByWallet(wallet).subscribe({
        next: (data) => {
          console.log(data)
          this.user = data;
          this.fetchProfilePicture();
        },
        error: (error) => {
          console.error("Failed to fetch user data:", error);
        }
      });
    }
  }

  async fetchProfilePicture() {
    const file = await this.ipfsService.retrieveFile(this.user.image);
    this.profilePictureUrl = URL.createObjectURL(file);
  }
}

export default PerfilComponent;
