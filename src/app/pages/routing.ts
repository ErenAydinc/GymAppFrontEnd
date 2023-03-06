import { PersonalTrainerGuard } from './../helpers/personal-trainer.guard';
import { Routes } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';
import { GymAdminGuard } from '../helpers/gym-admin.guard';
import { HomeComponent } from './home/home.component';
import { SystemAdminGuard } from '../helpers/system-admin.guard';

const Routing: Routes = [
  // {
  //   path: 'dashboard',
  //   loadChildren: () =>
  //     import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  // },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'gymapp/admin',
    canActivate:[GymAdminGuard],
    loadChildren: () =>
      import('./adminPages/admin-pages.module').then((m) => m.AdminPagesModule),
  },
  {
    path: 'gymapp/personaltrainer',
    canActivate:[PersonalTrainerGuard],
    loadChildren: () =>
      import('./personal-trainer-pages/personal-trainer-pages.module').then((m) => m.PersonalTrainerPagesModule),
  },
  {
    path: 'gymapp/systemadmin',
    canActivate:[SystemAdminGuard],
    loadChildren: () =>
      import('./system-admin-pages/system-admin-pages.module').then((m) => m.SystemAdminPagesModule),
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
