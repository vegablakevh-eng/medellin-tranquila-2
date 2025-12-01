import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebase.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth = firebaseAuth; //  Auth ya inicializado
  currentUser: User | null = null;

  constructor() {
    onAuthStateChanged(this.auth, user => {
      this.currentUser = user;
      console.log('Usuario actual:', user);
    });
  }

  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
