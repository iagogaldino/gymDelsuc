import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AuthPage {
  isLogin = true;
  isLoading = false;
  errorMessage = '';

  // Login form
  loginForm = {
    email: '',
    password: ''
  };

  // Registration form
  registerForm = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    userType: 'student' as 'student' | 'trainer',
    objective: '',
    physicalData: {
      weight: null as number | null,
      height: null as number | null,
      age: null as number | null,
      gender: 'male' as 'male' | 'female' | 'other'
    }
  };

  objectives = [
    { id: 'hipertrofia', name: 'Hipertrofia', description: 'Ganho de massa muscular' },
    { id: 'emagrecimento', name: 'Emagrecimento', description: 'Perda de peso e definição' },
    { id: 'condicionamento', name: 'Condicionamento', description: 'Melhorar resistência e saúde' },
    { id: 'forca', name: 'Força', description: 'Aumentar força muscular' },
    { id: 'flexibilidade', name: 'Flexibilidade', description: 'Melhorar mobilidade e alongamento' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onLogin() {
    if (!this.loginForm.email || !this.loginForm.password) {
      this.errorMessage = 'Por favor, preencha todos os campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.login(this.loginForm.email, this.loginForm.password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.errorMessage = 'Erro no login. Verifique suas credenciais.';
    } finally {
      this.isLoading = false;
    }
  }

  async onRegister() {
    if (!this.validateRegisterForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      if (this.registerForm.userType === 'student') {
        await this.authService.registerStudent({
          email: this.registerForm.email,
          password: this.registerForm.password,
          name: this.registerForm.name,
          objective: this.registerForm.objective,
          physicalData: this.registerForm.physicalData
        });
      } else {
        await this.authService.registerTrainer({
          email: this.registerForm.email,
          password: this.registerForm.password,
          name: this.registerForm.name,
          profile: {
            bio: '',
            experience: 0,
            specialties: [],
            location: '',
            rating: 0,
            totalReviews: 0,
            hourlyRate: 0,
            profileImage: ''
          }
        });
      }
      
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.errorMessage = 'Erro no registro. Tente novamente.';
    } finally {
      this.isLoading = false;
    }
  }

  private validateRegisterForm(): boolean {
    if (!this.registerForm.email || !this.registerForm.password || !this.registerForm.name) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios';
      return false;
    }

    if (this.registerForm.password !== this.registerForm.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem';
      return false;
    }

    if (this.registerForm.password.length < 6) {
      this.errorMessage = 'A senha deve ter pelo menos 6 caracteres';
      return false;
    }

    if (this.registerForm.userType === 'student' && !this.registerForm.objective) {
      this.errorMessage = 'Por favor, selecione um objetivo';
      return false;
    }

    return true;
  }

  async onGoogleLogin() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.loginWithGoogle();
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.errorMessage = 'Erro no login com Google';
    } finally {
      this.isLoading = false;
    }
  }

  async onFacebookLogin() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.loginWithFacebook();
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.errorMessage = 'Erro no login com Facebook';
    } finally {
      this.isLoading = false;
    }
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
    this.resetForms();
  }

  private resetForms() {
    this.loginForm = { email: '', password: '' };
    this.registerForm = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      userType: 'student',
      objective: '',
      physicalData: {
        weight: null,
        height: null,
        age: null,
        gender: 'male'
      }
    };
  }
}
