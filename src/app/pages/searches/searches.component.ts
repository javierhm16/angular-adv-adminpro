import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styleUrls: ['./searches.component.css']
})
export class SearchesComponent implements OnInit {

  users: User[] = [];
  medicos: Medico[] = [];
  hospitals: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute, private searchSvc: SearchService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      ({ terms }) => {
        this.globalSearch(terms);
      }
    )
  }

  globalSearch(terms: string) {
    this.searchSvc.globalSearch(terms).subscribe(
      (res: any) => {
        this.users = res.users;
        this.medicos = res.medicos;
        this.hospitals = res.hospitals;
      }
    );
  }

}
