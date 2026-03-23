import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AtmService, AccountType } from '../../atm.service';



@Component({
  selector: 'app-amount',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './amount.component.html',
  styleUrl: './amount.component.css'
})
export class AmountComponent {
  mode: 'deposit' | 'withdraw' = 'deposit';
  account: AccountType = 'checking';

  amount: number | null = null;
  errorMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public atm: AtmService
  ) {
    // 1) Read whether this page is for deposit or withdraw
    this.mode = this.route.snapshot.data['mode'];

    // 2) Read which account from the URL: /deposit/amount/:account
    const accParam = this.route.snapshot.paramMap.get('account');

    // Validate the param so we don't crash on weird URLs
    if (accParam === 'checking' || accParam === 'savings') {
      this.account = accParam;
    } else {
      // Unknown account -> send user back safely
      this.router.navigate(['/menu']);
    }
  }

  confirm(): void {
    this.errorMessage = '';

    const amt = Number(this.amount);

    // Basic input validation (exception handling)
    if (!Number.isFinite(amt) || amt <= 0) {
      this.errorMessage = `Please enter a valid ${this.mode} amount greater than 0.`;
      return;
    }

    // Call the correct service method
    const result =
      this.mode === 'deposit'
        ? this.atm.deposit(this.account, amt)
        : this.atm.withdraw(this.account, amt);

    // Handle errors like insufficient funds
    if (!result.ok) {
      this.errorMessage = result.message;
      return;
    }

    // Success -> show receipt
    this.router.navigate(['/receipt']);
  }

  cancel(): void {
    // Cancels transaction (no balance changes because we never called deposit/withdraw)
    this.router.navigate(['/menu']);
  }

  get title(): string {
    // Nice readable title like: "Deposit to Checking"
    const action = this.mode === 'deposit' ? 'Deposit to' : 'Withdraw from';
    const acct = this.account === 'checking' ? 'Checking' : 'Savings';
    return `${action} ${acct}`;
  }
}
