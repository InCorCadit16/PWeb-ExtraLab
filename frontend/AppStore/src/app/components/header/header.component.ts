import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, AuthService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private _apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  get isPublisher() {
    return this.authService.isPublisher;
  }

  logout() {
    this._apiService.logout(this.authService.refreshToken).subscribe((result) => {
      this.authService.logout();
      this.router.navigate(['login']);
    })
  }

}
