import { Component, OnInit } from '@angular/core';
import { User } from '../services/user.model';
import UserService from '../services/user.service';
import { MetamaskService } from '../services/metamask.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

  user?: User;
  
  constructor(
    private userService: UserService,
    private metamaskService: MetamaskService) {}

  ngOnInit(): void {
    // Assuming you have the wallet value for this example
    
    const wallet = this.metamaskService.currentAccount().toString();
    this.userService.fetchUserByWallet(wallet);

    this.userService.user$.subscribe(data => {
      this.user = data;
      console.log(data);
    });
  }
}

export default PerfilComponent;