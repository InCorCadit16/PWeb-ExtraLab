import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ApiService, AuthService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private _authService: AuthService,
    private _apiService: ApiService,
    private _snackBar: MatSnackBar,
    private _router: Router,
  ) { }

  ngOnInit(): void { }

  submit() {
    const request = this.loginForm.value;

    this._apiService.login(
      request.username,
      request.password
    ).pipe(
      catchError((err) => of(err.error.detail))
    ).subscribe((result: string|object) => {
      if (typeof result === 'string')
        this._snackBar.open(result, 'OK', { duration: 5000 });
      else {
        this._authService.login(result);
        this._router.navigate(['main']);
      }
    })
  }

}
