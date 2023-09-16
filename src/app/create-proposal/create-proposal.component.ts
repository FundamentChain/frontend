import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IpfsService } from '../services/ipfs.service';
import { MetamaskService } from '../services/metamask.service';

@Component({
  selector: 'app-create-proposal',
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.css']
})
export class CreateProposalComponent {

  hash: string = '';
  cid: string = '';
  selectedFile: File | null = null;

  constructor (
    private apiService: ApiService, 
    private metamaskService: MetamaskService,
    private ipfsService: IpfsService) {}

  async createProposal(
    title: string,
    description: string,
    endTime: string,
    amountRequested: string,
    ): Promise<void> {
      const address = await this.metamaskService.currentAccountCorreta();
      this.apiService.postCreateCampaign(
        address,
        this.cid,
        title,
        description,
        Number(endTime),
        Number(amountRequested)
      ).subscribe({
        next: (response) => {
          this.hash = response;
          console.error('Hash:', this.hash);
        },
        error: (error) =>  {
          console.error('Error creating proposal:', error);
          this.hash = error;
        }
      });
    }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  
  uploadFile() {
    if (this.selectedFile) {
      this.ipfsService.uploadFile(this.selectedFile).subscribe(
        (cid) => {
          this.cid = `File uploaded to IPFS with CID: ${cid}`;
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
