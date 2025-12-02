import { Routes } from '@angular/router';

// Importar páginas tradicionales (para tabs y rutas fuera de tabs)
import { RegisterPage } from './pages/register/register.page';
import { MeditacionesPage } from './pages/meditaciones/meditaciones.page';
import { ForoPage } from './pages/foro/foro.page';
import { ConfiguracionPage } from './pages/configuracion/configuracion.page';
import { HistorialPage } from './pages/historial/historial.page';
import { RespiracionPage } from './pages/respiracion/respiracion.page';
import { ContactoPage } from './pages/contacto/contacto.page';
import { PrivacidadPage } from './pages/privacidad/privacidad.page';
import { NotificacionesPage } from './pages/notificaciones/notificaciones.page';
import { FormularioEmocionalPage } from './pages/formularioEmociones/formularioEmociones.page';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  // Ruta inicial → redirige a login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login y dashboard usando loadComponent (standalone)
 { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },
 { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage) },

  // Registro
  { path: 'register', component: RegisterPage },

  // Formulario emocional
  { path: 'formulario-emocionales', component: FormularioEmocionalPage },

  // ⭐ TABS (5 pestañas principales)
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage)},
      { path: 'meditaciones', component: MeditacionesPage },
      { path: 'foro', component: ForoPage },
      { path: 'formularioEmociones', component: FormularioEmocionalPage },
      { path: 'contacto', component: ContactoPage },
      { path: 'configuracion', component: ConfiguracionPage },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'notificaciones', component: NotificacionesPage },
    ]
  },

  // ⭐ Rutas fuera de tabs
 // { path: 'historial', component: HistorialPage },
  //{ path: 'respiracion', component: RespiracionPage },
    //{ path: 'contacto', component: ContactoPage },
 // { path: 'privacidad', component: PrivacidadPage },
 // { path: 'notificaciones', component: NotificacionesPage },
    { path: 'register', component: RegisterPage }
];
