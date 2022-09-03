import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  user!: User;
  uploadedImg!: File;
  imgTemp: any = null;

  constructor(private fb: FormBuilder, private userSvc: UserService, private fileUploadSvc: FileUploadService) {
    this.user = userSvc.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    })
  }

  updateProfile() {
    this.userSvc.updateUser(this.profileForm.value)
      .subscribe(
        () => {
          Swal.fire('User updated', 'Los datos se han actualizado', 'success');
          const { name, email } = this.profileForm.value;
          this.user.name = name;
          this.user.email = email;
        },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      )
  }

  changeImg(file: any) {
    this.uploadedImg = file.target.files[0];

    if (!this.uploadedImg) {
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImg);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  uploadImg() {
    this.fileUploadSvc.updateImg(this.uploadedImg, 'users', this.user.uid || '')
      .then(
        (res) => {
          Swal.fire('Img uploaded', 'La imagen se ha actualizado', 'success');
          this.user.img = res;
        }
      )
  }

}
