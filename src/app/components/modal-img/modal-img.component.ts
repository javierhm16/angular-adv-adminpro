import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImgService } from 'src/app/services/modal-img.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent implements OnInit {

  uploadedImg!: File;
  imgTemp: any = null;

  constructor(public modalImgSvc: ModalImgService, private fileUploadSvc: FileUploadService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalImgSvc.closeModal();
    this.imgTemp = null;
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
    const id = this.modalImgSvc.id;
    const type = this.modalImgSvc.type;

    this.fileUploadSvc.updateImg(this.uploadedImg, type, id)
      .then(
        (img) => {
          Swal.fire('Img uploaded', 'La imagen se ha actualizado', 'success');
          this.modalImgSvc.newImg.emit(img);
          this.closeModal();
        }
      )
  }

}
