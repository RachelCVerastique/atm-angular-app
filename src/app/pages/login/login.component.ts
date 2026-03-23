import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AtmService } from '../../atm.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  pin: string = '';
  message: string = '';

  constructor(private atm: AtmService, private router: Router) {}

  submit(): void {
    if (this.pin.length !== 4 || isNaN(Number(this.pin))) {
      this.message = 'Please enter a valid 4-digit PIN.';
      return;
    }

    const success = this.atm.login(this.pin);

    if (success) {
      this.message = '';
      this.router.navigate(['/menu']);
    } else {
      this.message = 'Incorrect PIN. Please try again.';
    }
  }
}
