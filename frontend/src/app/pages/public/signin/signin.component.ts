import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SignInComponent {
  signInForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public toastr: ToastrService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
    this.signInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  signIn(): void {
    if (this.signInForm.valid) {
      const username = this.signInForm.get('username')!.value;
      const password = this.signInForm.get('password')!.value;
  
      // Call signIn method from AuthService
      this.authService.signIn(username, password).subscribe(
        (response: any) => {
          // signIn successful
          this.toastr.success('Signed in!', 'Success', {
            positionClass: 'toast-top-center'
          });
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          // signIn failed
          console.error('Sign-in failed:', error);
          this.toastr.error('Failed to Sign In. Please try again..', 'Error', {
            positionClass:'toast-top-center'
          });
        }
      );
    } else {
      // Form is invalid
      this.toastr.warning('Please fill out all required fields.', 'Warning', {
        positionClass:'toast-top-center'
      });
    }
  }
}