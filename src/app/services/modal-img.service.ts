import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImgService {

  type!: 'users' | 'medicos' | 'hospitals';
  id!: string;
  img: string = 'no-image';

  newImg: EventEmitter<string> = new EventEmitter<string>();

  private _hideModal: boolean = true;
  get hideModal() {
    return this._hideModal;
  }

  constructor() { }

  openModal(type: 'users' | 'medicos' | 'hospitals', id: string, img?: string) {
    this._hideModal = false;
    this.type = type;
    this.id = id;

    if (img?.includes('https')) {
      this.img = img
    } else {
      this.img = `${base_url}/upload/${type}/${img}`;
    }
  }

  closeModal() {
    this._hideModal = true;
  }

}
