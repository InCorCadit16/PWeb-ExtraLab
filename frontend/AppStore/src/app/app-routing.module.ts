import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent, LoginComponent, MainComponent, NewAppComponent, RegisterComponent } from './components';
import { AuthGuard, NoAuthGuard } from './guards';

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'login', canActivate: [NoAuthGuard], component: LoginComponent},
  {path: 'register', canActivate: [NoAuthGuard], component: RegisterComponent},
  {path: 'app/:id', component: ApplicationComponent},
  {
    path: 'new-app',
    canActivate: [AuthGuard],
    component: NewAppComponent
  },
  {path: '*', redirectTo: 'main'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
