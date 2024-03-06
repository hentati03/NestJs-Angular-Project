import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CandidatService } from 'src/app/services/candidat.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  signUpForm: FormGroup; // Declare a FormGroup variable

  constructor(
    private fb: FormBuilder,
    private candidatService: CandidatService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        roleDesired: [''],
        location: [''],
      }
      // { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      delete formData.confirmPassword; // Remove confirmPassword from the data sent to the backend

      this.candidatService.signUp(formData).subscribe(
        (response) => {
          // Handle successful signup here
          console.log(response); // Log the response
          this.toastr.success('User signed up successfully'); // Show success notification with Toastr
          this.router.navigate(['/signin']);
          // You can redirect the user to another page after successful signup if needed
        },
        (error) => {
          // Handle error here
          console.error(error); // Log the error
          this.toastr.error('Failed to sign up user'); // Show error notification with Toastr
        }
      );
    }
  }

  // Custom validator function to check if password matches confirmPassword
  // passwordMatchValidator(formGroup: FormGroup) {
  //   const passwordControl = formGroup.get('password');
  //   const confirmPasswordControl = formGroup.get('confirmPassword');

  //   if (!passwordControl || !confirmPasswordControl) {
  //     return null;
  //   }

  //   if (passwordControl.value !== confirmPasswordControl.value) {
  //     confirmPasswordControl.setErrors({ passwordMismatch: true });
  //   } else {
  //     confirmPasswordControl.setErrors(null);
  //   }
  // }
}
