import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AmountComponent } from './pages/amount/amount.component';
import { ReceiptComponent } from './pages/receipt/receipt.component';
import { authGuard } from './guards/auth.guard';
import {SelectAccountComponent} from "./pages/select-account/select-account.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login is public
  { path: 'login', component: LoginComponent },

  // Everything below requires login
  { path: 'menu', component: MenuComponent, canActivate: [authGuard] },

  { path: 'deposit/select', component: SelectAccountComponent, data: { mode: 'deposit' }, canActivate: [authGuard] },
  { path: 'deposit/amount/:account', component: AmountComponent, data: { mode: 'deposit' }, canActivate: [authGuard] },

  { path: 'withdraw/select', component: SelectAccountComponent, data: { mode: 'withdraw' }, canActivate: [authGuard] },
  { path: 'withdraw/amount/:account', component: AmountComponent, data: { mode: 'withdraw' }, canActivate: [authGuard] },

  { path: 'receipt', component: ReceiptComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: 'login' }
];
