import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    this.loading = true;
    this.error = '';
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['tabs/dashboard']);
    } catch (err: any) {
      this.error = err.message || 'Error en el login';
    } finally {
      this.loading = false;
    }
  }

  goToGuest() {
    this.router.navigate(['tabs/dashboard']);
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
