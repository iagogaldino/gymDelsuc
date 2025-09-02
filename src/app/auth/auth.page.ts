import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as allIcons from 'ionicons/icons';
import { addIcons } from 'ionicons';
addIcons(allIcons);
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AuthPage {
  constructor(private router: Router, private authService: AuthService) {}

  onClickLogin() {
    this.router.navigate(['/home']);
  }

}
