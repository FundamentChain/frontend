import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {

  constructor(
    private UserService: UserService
  ) {}

  updateUser(
    usermane: string,
    email: string,
    description: string,
    image: string,
  ) {
    this.UserService.putUpdateUser(
      usermane,
      email,description,
      image
    )
  }
}
