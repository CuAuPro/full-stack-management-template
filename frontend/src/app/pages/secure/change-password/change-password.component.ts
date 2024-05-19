import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  changePasswordForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  changePassword(): void {
    if (this.changePasswordForm.valid) {
      const username = this.authService.getUserData()?.username;
      if (!username) {
        throw new Error('Unknown username.');
      }
      const oldPassword = this.changePasswordForm.get('oldPassword')!.value;
      const newPassword = this.changePasswordForm.get('newPassword')!.value;
      const confirmPassword = this.changePasswordForm.get('confirmPassword')!.value;

      // Check if new password and confirm password match
      if (newPassword !== confirmPassword) {
        this.toastr.error('Password and confirm password do not match.', 'Error', {
          positionClass: 'toast-top-center'
        });
        return;
      }

      this.authService.changePassword(username, oldPassword, newPassword).subscribe(
        success => {
          if (success) {
            // Registration successful
            this.toastr.success('Password changed successfully.', 'Success', {
              positionClass: 'toast-top-center'
            });
          } else {
            // Registration failed
            this.toastr.error('Failed to change password. Please try again.', 'Error', {
              positionClass: 'toast-top-center'
            });
          }
        },
        error => {
          // Handle error
          console.error(error);
          this.toastr.error('Failed to change password. Please try again.', 'Error', {
            positionClass: 'toast-top-center'
          });
        }
      );
    }
  }
}
