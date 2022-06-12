import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application.model';
import { ApiService } from 'src/app/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  applications: Application[];

  constructor(
    private _apiService: ApiService
  ) { }

  ngOnInit(): void {
    this._apiService.getApps().subscribe((apps) => this.applications = apps);
  }

}
