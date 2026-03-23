import { Injectable } from '@angular/core';

export type AccountType = 'checking' | 'savings';
export type TransactionMode = 'deposit' | 'withdraw';

export interface TransactionRecord {
  type: 'deposit' | 'withdraw';
  account: AccountType;
  amount: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class AtmService {
  pin: string = '1234';
  isLoggedIn: boolean = false;

  checkingBalance: number = 500;
  savingsBalance: number = 1000;

  selectedAccount: AccountType | null = null;
  mode: TransactionMode | null = null;

  lastTransaction: string = '';
  lastMessage: string = '';

  transactionHistory: TransactionRecord[] = [];

  login(inputPin: string): boolean {
    if (inputPin === this.pin) {
      this.isLoggedIn = true;
      this.lastMessage = 'Welcome.';
      return true;
    }

    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.selectedAccount = null;
    this.mode = null;
    this.lastTransaction = '';
    this.lastMessage = 'Thank you for using the ATM.';
  }

  getBalance(account: AccountType): number {
    return account === 'checking' ? this.checkingBalance : this.savingsBalance;
  }

  deposit(account: AccountType, amount: number): { ok: boolean; message: string } {
    if (amount <= 0 || isNaN(amount)) {
      return {
        ok: false,
        message: 'Please enter a valid deposit amount.'
      };
    }

    if (account === 'checking') {
      this.checkingBalance += amount;
    } else {
      this.savingsBalance += amount;
    }

    this.selectedAccount = account;
    this.mode = 'deposit';

    const timestamp = new Date().toLocaleString();

    this.lastTransaction = `Deposited $${amount.toFixed(2)} into ${account}.`;
    this.lastMessage = `${this.lastTransaction} (${timestamp})`;

    this.transactionHistory.unshift({
      type: 'deposit',
      account,
      amount,
      timestamp
    });

    return {
      ok: true,
      message: this.lastMessage
    };
  }

  withdraw(account: AccountType, amount: number): { ok: boolean; message: string } {
    if (amount <= 0 || isNaN(amount)) {
      return {
        ok: false,
        message: 'Please enter a valid withdrawal amount.'
      };
    }

    const currentBalance = this.getBalance(account);

    if (amount > currentBalance) {
      return {
        ok: false,
        message: 'Insufficient funds for this withdrawal.'
      };
    }

    if (account === 'checking') {
      this.checkingBalance -= amount;
    } else {
      this.savingsBalance -= amount;
    }

    this.selectedAccount = account;
    this.mode = 'withdraw';

    const timestamp = new Date().toLocaleString();

    this.lastTransaction = `Withdrew $${amount.toFixed(2)} from ${account}.`;
    this.lastMessage = `${this.lastTransaction} (${timestamp})`;

    this.transactionHistory.unshift({
      type: 'withdraw',
      account,
      amount,
      timestamp
    });

    return {
      ok: true,
      message: this.lastMessage
    };
  }
}
