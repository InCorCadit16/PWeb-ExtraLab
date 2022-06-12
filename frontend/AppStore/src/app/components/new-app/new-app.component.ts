import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';  
import { Router } from '@angular/router';
import { ApiService, AuthService } from 'src/app/services';

@Component({
  selector: 'app-new-app',
  templateUrl: './new-app.component.html',
  styleUrls: ['./new-app.component.scss']
})
export class NewAppComponent implements OnInit {
  newAppForm: FormGroup;

  constructor(
    private _apiService: ApiService,
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.newAppForm = new FormGroup({
      name: new FormControl('', Validators.maxLength(256)),
      description: new FormControl('', [Validators.required]),
      imgSource: new FormControl('', [Validators.required]),
      isGame: new FormControl(false),
    })
  }

  submit() {
    const request = this.newAppForm.value;
    request['authorId'] = this._authService.userInfo?.userId;

    this._apiService.createApp(request).subscribe((result) => this._router.navigate(['app', result.id]));
  }

}
