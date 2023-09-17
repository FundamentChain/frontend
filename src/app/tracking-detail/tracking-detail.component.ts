import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tracking-detail',
  templateUrl: './tracking-detail.component.html',
  styleUrls: ['./tracking-detail.component.css']
})
export class TrackingDetailComponent {

  proposal?: any;
  contractAddress: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService) {
  }

  async ngOnInit() {
    this.contractAddress = this.route.snapshot.paramMap.get('address') ?? "";
    this.getCampaignDetail(this.contractAddress);
  }

  getCampaignDetail(address:string): void {
    this.apiService.getCampaignDetail(address).subscribe({
      next: (response: any) => {
        this.proposal = response;
      },
      error: (error: any) =>  {
        console.error('Error fetching ended proposals:', error);
      }
    });
  }

}
