import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandeComponent } from './components/demande/demande.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { SignupPageComponent } from './component/signup-page/signup-page.component';

const routes: Routes = [
  { path: 'demandes', component: DemandeComponent },
  { path: '', component: DemandeComponent },
  { path: 'signin', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
