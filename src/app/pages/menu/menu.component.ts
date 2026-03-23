import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule} from "@angular/common";
import { AtmService } from '../../atm.service';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
    showBalances = false;

    constructor(
      public atm: AtmService,
      private router: Router
    ) {}

  toggleBalances(): void {
      this.showBalances = !this.showBalances;
  }

  goToWithdraw(): void {
      this.router.navigate(['/withdraw/select'])
  }

  goToDeposit(): void {
    this.router.navigate(['/deposit/select']);
  }

  exit(): void {
    this.atm.logout();
    this.router.navigate(['/login']);
  }
}
