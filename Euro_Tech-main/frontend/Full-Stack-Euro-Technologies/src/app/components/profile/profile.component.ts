import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user: any;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    
    if (!this.user) {
      this.router.navigate(['/']);
      return;
    }

    this.profileForm = this.fb.group({
      firstName: [this.user.firstName || '', Validators.required],
      lastName: [this.user.lastName || '', Validators.required],
      email: [this.user.email || '', [Validators.required, Validators.email]],
      phone: [this.user.phone || '', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.isLoading = true;
      
      // Simulate API call (you'll need to implement the actual backend endpoint)
      setTimeout(() => {
        const updatedUser = {
          ...this.user,
          ...this.profileForm.value
        };
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('showToast', { 
            detail: { message: 'Profile updated successfully!', type: 'success' } 
          });
          window.dispatchEvent(event);
        }
        
        this.isLoading = false;
        this.router.navigate(['/']);
      }, 1000);
    }
  }
}
