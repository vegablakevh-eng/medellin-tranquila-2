import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class RegisterPage {
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
    this.error = '';
    if (this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    this.loading = true;
    try {
      await this.authService.registrarUsuario(this.email, this.password);
      this.router.navigate(['/dashboard']); // redirige al dashboard
    } catch (err: any) {
      this.error = err.message || 'Error creando usuario';
    } finally {
      this.loading = false;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
