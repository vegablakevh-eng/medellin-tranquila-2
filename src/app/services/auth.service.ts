// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { Auth, user, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  user$: Observable<User | null>;

  constructor() {
    // Observable del estado del usuario
    this.user$ = user(this.auth);
  }

  // Registrar usuario
  registrarUsuario(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);

  }

  // Login usuario
  loginUsuario(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);

  }

  // Logout
  logout() {
    return from(signOut(this.auth));
  }

  // Obtener usuario actual como observable
  obtenerUsuarioActual(): Observable<User | null> {
    return this.user$;
  }

  // Obtener usuario actual como objeto (sin observable)
  obtenerUsuarioActualValue(): User | null {
    return this.auth.currentUser;
  }

  // Obtener token del usuario actual
  async obtenerTokenUsuario(): Promise<string | null> {
    const usuario = this.auth.currentUser;
    if (!usuario) return null;
    return usuario.getIdToken();
  }
}
