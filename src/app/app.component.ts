
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { firebaseApp } from './firebase/firebase.config';

// Importa la app de Firebase


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet], // necesario en standalone
})
export class AppComponent {
  constructor() {
   // Esto confirma que Firebase se inicializó correctamente
    console.log('Firebase inicializado:', firebaseApp);
  }
}
