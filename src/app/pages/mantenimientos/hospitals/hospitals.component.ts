import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImgService } from 'src/app/services/modal-img.service';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit, OnDestroy {

  hospitals: Hospital[] = [];
  loading: boolean = true;
  tempHospitals: Hospital[] = [];

  imgSubs!: Subscription;

  constructor(private hospitalSvc: HospitalService, private modalImgSvc: ModalImgService, private searchSvc: SearchService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadHospitals();

    this.imgSubs = this.modalImgSvc.newImg
      .pipe(
        delay(1000)
      )
      .subscribe(img => this.loadHospitals());
  }

  loadHospitals() {
    this.hospitalSvc.loadHospitals().subscribe(
      res => {
        this.hospitals = res;
        this.tempHospitals = this.hospitals;
        this.loading = false;
      }
    )
  }

  saveChanges(hospital: Hospital) {
    this.hospitalSvc.updateHospital(hospital.name, hospital._id).subscribe(
      res => {
        Swal.fire('Updated', hospital.name, 'success');
      }
    );
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalSvc.deleteHospital(hospital._id).subscribe(
      res => {
        this.loadHospitals();
        Swal.fire('Eliminated', hospital.name, 'success');
      }
    );
  }

  async openSweetModal() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create a new Hospital',
      text: 'Set the hospital name',
      input: 'text',
      inputPlaceholder: 'Hospital name...',
      showCancelButton: true
    })

    if (value?.trim().length > 0) {
      this.hospitalSvc.createHospital(value).subscribe(
        () => {
          this.loadHospitals();
          Swal.fire('Created', 'New hospital created', 'success');
        }
      )
    }
  }

  openModal(hospital: Hospital) {
    this.modalImgSvc.openModal('hospitals', hospital._id || '', hospital.img);
  }

  search(term: string) {
    if (term.length === 0) {
      this.hospitals = this.tempHospitals;
      return;
    }

    this.searchSvc.search('hospitals', term).subscribe(
      (res: Hospital[]) => {
        this.hospitals = res;
      }
    )
  }

}
