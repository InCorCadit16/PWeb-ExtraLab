import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'src/app/models/application.model';
import { ApiService, AuthService } from 'src/app/services';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  app: Application;

  constructor(
    private _apiService: ApiService,
    private _authSerivce: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = parseInt(this.router.url.split('/').reverse()[0]);
    this._apiService.getAppById(id).subscribe((app) => this.app = app);
  }

  get userIsOwner() {
    if (!this._authSerivce.isLoggedIn) return false;

    return this.app.authorId === this._authSerivce.userInfo?.userId;
  }

  get isLoggedIn() {
    return this._authSerivce.isLoggedIn;
  }

  deleteApp() {
    this._apiService.deleteApp(this.app.id).subscribe((_) => this.router.navigate(['main']));
  }

}
