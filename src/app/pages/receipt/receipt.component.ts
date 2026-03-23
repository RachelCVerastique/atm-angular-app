import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AtmService } from '../../atm.service';


@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent {

  constructor(
    public atm: AtmService,
    private router: Router
  ) {}

  backToMenu(): void {
    this.router.navigate(['/menu']);
  }

  exit(): void {
    this.atm.logout();
    this.router.navigate(['/login']);
  }
}
