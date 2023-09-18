import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IpfsService } from '../services/ipfs.service';
import { MetamaskService } from '../services/metamask.service';
import { ContractServiceService } from '../services/contract-service.service';

@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.css']
})
export class CreateProposalComponent {

  // Transaction
  hash: string = '';

  // IPFS
  cid: string = '';
  selectedFile: File | null = null;

  constructor (
    private apiService: ApiService, 
    private metamaskService: MetamaskService,
    private ipfsService: IpfsService,
    public contract: ContractServiceService) {}

  // Function to create a Campaign calling the backend API 
  async createProposal(
    title: string,
    description: string,
    endTime: string,
    amountRequested: string,
    ): Promise<void> {
      const amountInWEI = this.contract.convertToWEI(Number(amountRequested));
      const address = await this.metamaskService.currentAccountCorreta();
      this.apiService.postCreateCampaign(
        address,
        this.cid,
        title,
        description,
        Number(endTime),
        amountInWEI
      ).subscribe({
        next: (response) => {
          this.hash = response.message;
          console.log('Hash:', this.hash);
        },
        error: (error) =>  {
          this.hash = "Error creating campaign";
          console.log('Error creating proposal:', error);
        }
      });
    }

  // Function to change the file to be uploaded to IPFS
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  
  // Function to upload to IPFS
  uploadFile() {
    if (this.selectedFile) {
      this.ipfsService.uploadFile(this.selectedFile).subscribe(
        (cid) => {
          this.cid = cid;
        },
        (error) => {
          this.cid = "Error uploading the file to IPFS";
        }
      );
    } else {
      this.cid = "Please select a file";
    }
  }

}
