import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonToggle,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [
    // Módulos de Angular
    CommonModule, 
    FormsModule,
    // [ELIMINADO] La clase Router no debe importarse aquí en componentes standalone.
    
    // Componentes de Ionic (UI)
    IonContent, 
    
  ]
})
export class ConfiguracionPage implements OnInit {

  // 3. Inyectamos el Router con el modificador 'private' en el constructor
  // Esto es correcto y permite usar this.router.navigateByUrl
  constructor(private router: Router) { } 

  ngOnInit() {
  }

  /**
   * Método principal para cerrar la sesión del usuario.
   * Limpia los datos de sesión y redirige al usuario a la página de login.
   */
  async logout() {
    console.log('Iniciando proceso de cierre de sesión...');

    // 2. Limpieza de la Sesión y Tokens de Autenticación
    
    // a) Borrar del Local Storage: CRUCIAL para eliminar tokens o IDs de sesión.
    // Usar 'clear' elimina todo, pero 'removeItem' es más seguro si hay otras cosas guardadas.
    // Ejemplo: localStorage.removeItem('authToken');
    localStorage.clear(); 
    
    // b) Si usas un servicio de autenticación, llama a su método de limpieza.
    // Ejemplo: await this.authService.signOut();

    // 3. Redirección
    try {
      // Usamos 'navigateByUrl' para redirigir. 
      // La opción { replaceUrl: true } evita que el usuario pueda volver a las tabs
      // usando el botón de 'Atrás' del navegador/móvil, ya que reemplaza el historial.
      const loginRoute = '/login'; 
      await this.router.navigateByUrl(loginRoute, { replaceUrl: true });
      console.log(`Redirección exitosa a: ${loginRoute}`);
      
    } catch (error) {
      console.error('Error durante la redirección al login:', error);
      // Opcionalmente, mostrar un mensaje de error al usuario.
    }
  }
}