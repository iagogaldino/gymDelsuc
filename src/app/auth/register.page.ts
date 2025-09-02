import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import * as allIcons from 'ionicons/icons';
import { addIcons } from 'ionicons';
addIcons(allIcons);
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterPage {
  accountType: 'student' | 'trainer' = 'student';
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  acceptedTerms = false;

  constructor(private router: Router) {}

  setType(type: 'student' | 'trainer') {
    this.accountType = type;
  }

  togglePassword(input: HTMLIonInputElement) {
    const current = input.getAttribute('type') || 'password';
    input.setAttribute('type', current === 'password' ? 'text' : 'password');
  }

  onSubmit() {
    this.router.navigate(['/dashboard']);
  }

  onClickcreateAccount() {
    this.router.navigate(['/auth']);
  }
}


