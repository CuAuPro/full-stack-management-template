import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      const firstName = this.signUpForm.get('firstName')!.value;
      const lastName = this.signUpForm.get('lastName')!.value;
      const username = this.signUpForm.get('username')!.value;
      const password = this.signUpForm.get('password')!.value;
      const confirmPassword = this.signUpForm.get('confirmPassword')!.value;

      // Check if new password and confirm password match
      if (password !== confirmPassword) {
        this.toastr.error('Password and confirm password do not match.', 'Error', {
          positionClass: 'toast-top-center'
        });
        return;
      }

      this.authService.signUp(firstName, lastName, username, password).subscribe(
        success => {
          if (success) {
            // Registration successful
            this.toastr.success('Registration successful. Please login.', 'Success', {
              positionClass: 'toast-top-center'
            });
            this.router.navigate(['/signin']);
          } else {
            // Registration failed
            this.toastr.error('Failed to register. Please try again.', 'Error', {
              positionClass: 'toast-top-center'
            });
          }
        },
        error => {
          // Handle error
          console.error(error);
          this.toastr.error('Failed to register. Please try again.', 'Error', {
            positionClass: 'toast-top-center'
          });
        }
      );
    }
  }
}