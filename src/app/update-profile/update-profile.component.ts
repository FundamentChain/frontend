import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { IpfsService } from '../services/ipfs.service';

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

  constructor(
    private UserService: UserService,
    private ipfsService: IpfsService
  ) {}

  updateUser(
    usermane: string,
    email: string,
    description: string
  ) {
    this.UserService.putUpdateUser(
      usermane,
      email,description,
      this.cid
    )
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
