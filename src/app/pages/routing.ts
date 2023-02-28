import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'gymapp/admin',
    loadChildren: () =>
      import('./adminPages/admin-pages.module').then((m) => m.AdminPagesModule),
  },
  {
    path: 'gymapp/personaltrainer',
    loadChildren: () =>
      import('./personal-trainer-pages/personal-trainer-pages.module').then((m) => m.PersonalTrainerPagesModule),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
