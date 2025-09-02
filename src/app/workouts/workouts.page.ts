import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class WorkoutsPage {
  weekProgress = 4; // out of 6 for demo

  todayWorkout = {
    name: 'Treino A - Peito e Tríceps',
    meta: '6 exercícios • 45-60 min',
    exercises: [
      { order: 1, name: 'Supino Reto', scheme: '4x8-12 • 60-90s', done: false },
      { order: 2, name: 'Supino Inclinado', scheme: '3x10-15 • 60s', done: false },
      { order: 3, name: 'Crucifixo', scheme: '3x12-15 • 45s', done: false }
    ]
  };

  recentWorkouts = [
    { name: 'Treino B - Costas e Bíceps', when: 'Ontem • 52 min' },
    { name: 'Treino A - Peito e Tríceps', when: '3 dias atrás • 48 min' }
  ];
}


