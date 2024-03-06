import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CandidatLogin } from 'src/app/interfaces/CandidatLogin';
import { CandidatService } from 'src/app/services/candidat.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(
    private candidatService: CandidatService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  // login(credentials: { email: string; password: string }) {
  //   this.candidatService.signIn(credentials).subscribe(
  //     (response) => {
  //       // Store token or user data in local storage or state management
  //       localStorage.setItem('token', response.access_token);
  //       // Redirect to dashboard or profile page
  //       this.router.navigate(['/dashboard']);
  //     },
  //     (error) => {
  //       // Handle error
  //       console.error('Login failed:', error);
  //     }
  //   );
  // }
  credentials: CandidatLogin = { email: '', password: '' };

  signIn() {
    this.candidatService.signIn(this.credentials).subscribe(
      (response) => {
        // Store token or user data in local storage or state management
        localStorage.setItem('token', response.access_token);
        this.toastr.success('User signed in successfully');
        // Redirect to dashboard or profile page
        this.router.navigate(['/demandes']);
      },
      (error) => {
        // Handle error
        console.error('Login failed:', error);
        this.toastr.error('Failed to sign in user');
      }
    );
  }
}
