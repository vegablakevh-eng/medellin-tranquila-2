import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const TABS_ROUTES: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../pages/dashboard/dashboard.page').then(m => m.DashboardPage),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../pages/historial/historial.page').then(m => m.HistorialPage),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../pages/configuracion/configuracion.page').then(m => m.ConfiguracionPage),
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full',
      },
    ]
  }
];
