import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { IpfsService } from '../services/ipfs.service';
import { MetamaskService } from '../services/metamask.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {

  cid: string = '';
  selectedFile: File | null = null;

  fileUrl: string | null = null;
  isImage = false;

  // update confirmed
  message = '';

  constructor(
    private UserService: UserService,
    private ipfsService: IpfsService,
    private MetamaskService: MetamaskService,
    private router: Router
  ) {}

  async updateUser(
    usermane: string,
    email: string,
    description: string
  ): Promise<void> {
    const wallet = await this.MetamaskService.currentAccountCorreta()
    this.UserService.putUpdateUser(
      wallet ?? "", 
      usermane,
      email,
      description,
      this.cid
    ).subscribe({
      next: (response) => {
        this.message = 'Updated Successfully';
        this.router.navigate(['/perfil']);
      },
      error: (error) => {
        console.error(error);
        this.message = 'Error on Update';
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
