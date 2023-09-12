import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MetamaskService } from '../services/metamask.service';
import { User } from '../services/user.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {
  walletAddress: string = '';
  user?: User;  

  constructor(private apiService: ApiService, private metamasService: MetamaskService) {
    this.user = {} as User;
  }

  ngOnInit(): void {
    this.walletAddress = this.metamasService.currentAccount();
    this.apiService.getUserByWallet().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error('Error fetching open proposals:', error);
      }
    });
    
  }


  
}

export default PerfilComponent;