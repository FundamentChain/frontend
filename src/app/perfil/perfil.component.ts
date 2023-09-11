import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {
  user: any;
  

  constructor(private apiService: ApiService) {
    
    
  }

  ngOnInit(): void {
    this.apiService.getUserByWallet().subscribe({
      next: (data) => {
        this.user = data;
        alert(data); // This will log the data received from the API
        console.log(data[0]); // You can access elements if 'data' is an array
      },
      error: (error) => {
        console.error('Error fetching open proposals:', error);
      }
    });
    
  }


  
}

export default PerfilComponent;