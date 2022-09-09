import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  hospitals: Hospital[] = [];
  medicoForm: FormGroup;

  selectedHospital: Hospital;
  selectedMedico: Medico;

  constructor(
    private fb: FormBuilder,
    private hospitalSvc: HospitalService,
    private medicoSvc: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.loadHospitals();

    this.medicoForm.get('hospital').valueChanges.subscribe(
      res => {
        this.selectedHospital = this.hospitals.find(h => h._id === res);
      }
    )

    this.activatedRoute.params.subscribe(
      ({ id }) => {
        this.loadMedico(id);
      }
    )
  }

  loadMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.medicoSvc.getMedicoById(id)
      .pipe(
        delay(100)
      )
      .subscribe(
        res => {
          if (!res) {
            this.router.navigateByUrl(`/dashboard/medicos`);
          } else {
            const { name, hospital: { _id } } = res;
            this.selectedMedico = res;
            this.medicoForm.setValue({ name, hospital: _id });
          }
        }
      );
  }

  loadHospitals() {
    this.hospitalSvc.loadHospitals().subscribe(
      (res: Hospital[]) => {
        this.hospitals = res;
      }
    )
  }

  saveMedico() {
    if (this.selectedMedico) {
      const name = this.medicoForm.get('name').value;
      const hospital = this.medicoForm.get('hospital').value;
      const id = this.selectedMedico._id;

      this.medicoSvc.updateMedico(name, hospital, id).subscribe(
        res => {
          Swal.fire('Medico updated', 'The medico has been updated', 'success');
        }
      )
    } else {
      this.medicoSvc.createMedico(this.medicoForm.value).subscribe(
        (res: any) => {
          Swal.fire('Medico created', 'The medico has been created', 'success');
          this.router.navigateByUrl(`/dashboard/medicos/${res.medico._id}`);
        }
      );
    }

  }

}
