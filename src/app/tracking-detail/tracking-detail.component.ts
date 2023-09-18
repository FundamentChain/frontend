import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ContractServiceService } from '../services/contract-service.service';

@Component({
  selector: 'app-tracking-detail',
  templateUrl: './tracking-detail.component.html',
  styleUrls: ['./tracking-detail.component.css']
})
export class TrackingDetailComponent {

  campaign?: any;
  contractAddress: any;

  constructor(
    private route: ActivatedRoute,
    public contract: ContractServiceService,
    private apiService: ApiService) {
  }

  async ngOnInit() {
    this.contractAddress = this.route.snapshot.paramMap.get('address') ?? "";
    this.getCampaignDetail(this.contractAddress);
  }

  getCampaignDetail(address:string): void {
    this.apiService.getCampaignDetail(address).subscribe({
      next: (response: any) => {
        this.campaign = response;
      },
      error: (error: any) =>  {
        console.error('Error fetching ended campaigns:', error);
      }
    });
  }

}
