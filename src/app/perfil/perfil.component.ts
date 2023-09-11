import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../services/user.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {
  user?: User;  

  constructor(private apiService: ApiService, ) {
    this.user = {} as User;
    
  }

  ngOnInit(): void {
    this.apiService.getUserByWallet().subscribe({
      next: (data) => {
        this.user = data;
        console.log('this data:',this.user); // This will log the data received from the API
         // You can access elements if 'data' is an array
      },
      error: (error) => {
        console.error('Error fetching open proposals:', error);
      }
    });
    
  }


  
}

export default PerfilComponent;