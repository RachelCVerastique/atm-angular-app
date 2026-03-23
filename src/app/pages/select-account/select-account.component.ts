import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AtmService } from '../../atm.service';
@Component({
  selector: 'app-select-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-account.component.html',
  styleUrl: './select-account.component.css'
})
export class SelectAccountComponent {

  mode: 'deposit' | 'withdraw' = 'deposit';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private atm: AtmService
  ) {
    this.mode = this.route.snapshot.data['mode'];
  }

  choose(account: 'checking' | 'savings'): void {
    this.atm.selectedAccount = account;
    this.atm.mode = this.mode;

    this.router.navigate([`/${this.mode}/amount/${account}`]);
  }

  cancel(): void {
    this.router.navigate(['/menu']);
  }
}
