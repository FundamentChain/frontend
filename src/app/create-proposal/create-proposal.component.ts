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
    amountRequested: string,
    date: string,
    hour: string
    ): Promise<void> {
      const amountInWEI = this.contract.convertToWEI(Number(amountRequested));
      const address = await this.metamaskService.currentAccountCorreta();
      this.apiService.postCreateCampaign(
        address,
        this.cid,
        title,
        description,
        amountInWEI,
        this.createTimestamp(date, hour)
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

  // Function to get timestamp from date
  createTimestamp(
    date: string,
    hour: string): number {
    try {
      const dateParts = date.split("-");
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10);
      const day = parseInt(dateParts[2], 10);
        
      const timeParts = hour.split(":");
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      return Number(new Date(year, month - 1, day, hours, minutes).getTime() / 1000);
    } catch (error: any) {
        console.error("Error:", error.message);
        return -1
    }
  }

}
