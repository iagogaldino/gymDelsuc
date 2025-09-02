import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DashboardPage {
  constructor(private router: Router) {}

  navigateToTrainers() {
    this.router.navigate(['/trainers']);
  }

  navigateToAuth() {
    this.router.navigate(['/auth']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
