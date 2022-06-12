import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ApiService, AuthService } from 'src/app/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(
    private _authService: AuthService,
    private _apiService: ApiService,
    private _snackBar: MatSnackBar,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  submit() {
    const request = this.registerForm.value;

    this._apiService.register(request).pipe(
      catchError((err) => of(err.error.detail))
    ).subscribe((result: string|object) => {
      if (typeof result === 'string')
        this._snackBar.open(result, 'OK', { duration: 5000 });
      else {
        this._authService.login(result);
        this._router.navigate(['personal', 'my-apps']);
      }
    })
  }

}
