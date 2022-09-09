import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImgService } from 'src/app/services/modal-img.service';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {

  medicos: Medico[] = [];
  tempMedicos: Medico[] = [];
  loading: boolean = true;

  imgSubs!: Subscription;

  constructor(private medicoSvc: MedicoService, private modalImgSvc: ModalImgService, private searchSvc: SearchService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadMedicos();

    this.imgSubs = this.modalImgSvc.newImg
      .pipe(
        delay(1000)
      )
      .subscribe(img => this.loadMedicos());
  }

  loadMedicos() {
    this.medicoSvc.loadMedicos().subscribe(
      res => {
        this.medicos = res;
        this.tempMedicos = this.medicos;
        this.loading = false;
      }
    )
  }

  openModal(medico: Medico) {
    this.modalImgSvc.openModal('medicos', medico._id, medico.img);
  }

  search(term: string) {
    if (term.length === 0) {
      this.medicos = this.tempMedicos;
      return;
    }

    this.searchSvc.search('medicos', term).subscribe(
      (res: Medico[]) => {
        this.medicos = res;
      }
    )
  }

  deleteMedico(medico: Medico) {
    this.medicoSvc.deleteMedico(medico._id).subscribe(
      res => {
        this.loadMedicos();
        Swal.fire('Eliminated', medico.name, 'success');
      }
    );
  }

}
