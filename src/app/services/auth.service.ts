import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Student, Trainer } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check for stored user data on app start
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }

  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock user data - in real app this would come from API
        const mockUser: Student = {
          id: '1',
          email: email,
          name: 'João Silva',
          userType: 'student',
          createdAt: new Date(),
          updatedAt: new Date(),
          objective: {
            id: '1',
            name: 'Hipertrofia',
            description: 'Ganho de massa muscular',
            icon: 'muscle'
          },
          physicalData: {
            weight: 75,
            height: 175,
            age: 28,
            gender: 'male',
            measurements: {
              chest: 95,
              waist: 80,
              hips: 95,
              biceps: 32,
              thighs: 55
            }
          },
          activePlans: [],
          progress: []
        };

        this.setCurrentUser(mockUser);
        resolve(mockUser);
      }, 1000);
    });
  }

  async registerStudent(userData: {
    email: string;
    password: string;
    name: string;
    objective: string;
    physicalData: any;
  }): Promise<Student> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newStudent: Student = {
          id: Date.now().toString(),
          email: userData.email,
          name: userData.name,
          userType: 'student',
          createdAt: new Date(),
          updatedAt: new Date(),
          objective: {
            id: '1',
            name: userData.objective,
            description: 'Objetivo personalizado',
            icon: 'target'
          },
          physicalData: userData.physicalData,
          activePlans: [],
          progress: []
        };

        this.setCurrentUser(newStudent);
        resolve(newStudent);
      }, 1000);
    });
  }

  async registerTrainer(userData: {
    email: string;
    password: string;
    name: string;
    profile: any;
  }): Promise<Trainer> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newTrainer: Trainer = {
          id: Date.now().toString(),
          email: userData.email,
          name: userData.name,
          userType: 'trainer',
          createdAt: new Date(),
          updatedAt: new Date(),
          profile: userData.profile,
          plans: [],
          students: [],
          certifications: []
        };

        this.setCurrentUser(newTrainer);
        resolve(newTrainer);
      }, 1000);
    });
  }

  async loginWithGoogle(): Promise<User> {
    // Simulate Google OAuth
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUser: Student = {
          id: 'google-1',
          email: 'joao@gmail.com',
          name: 'João Silva',
          userType: 'student',
          createdAt: new Date(),
          updatedAt: new Date(),
          objective: {
            id: '1',
            name: 'Emagrecimento',
            description: 'Perda de peso e definição',
            icon: 'fitness'
          },
          physicalData: {
            weight: 80,
            height: 170,
            age: 30,
            gender: 'male',
            measurements: {
              chest: 90,
              waist: 85,
              hips: 95,
              biceps: 30,
              thighs: 52
            }
          },
          activePlans: [],
          progress: []
        };

        this.setCurrentUser(mockUser);
        resolve(mockUser);
      }, 1000);
    });
  }

  async loginWithFacebook(): Promise<User> {
    // Simulate Facebook OAuth
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUser: Student = {
          id: 'fb-1',
          email: 'maria@facebook.com',
          name: 'Maria Santos',
          userType: 'student',
          createdAt: new Date(),
          updatedAt: new Date(),
          objective: {
            id: '2',
            name: 'Condicionamento',
            description: 'Melhorar resistência e saúde',
            icon: 'heart'
          },
          physicalData: {
            weight: 65,
            height: 165,
            age: 25,
            gender: 'female',
            measurements: {
              chest: 85,
              waist: 70,
              hips: 90,
              biceps: 25,
              thighs: 48
            }
          },
          activePlans: [],
          progress: []
        };

        this.setCurrentUser(mockUser);
        resolve(mockUser);
      }, 1000);
    });
  }

  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isStudent(): boolean {
    return this.currentUserSubject.value?.userType === 'student';
  }

  isTrainer(): boolean {
    return this.currentUserSubject.value?.userType === 'trainer';
  }
}
