import { StudentListComponent } from './user/student-list/student-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovementListComponent } from './movement/movement-list/movement-list.component';
import { PersonalTrainerListComponent } from './user/personalTrainer-list/personalTrainer-list.component';
import { AdminGuard } from 'src/app/helpers/admin.guard';
import { UsersMovementsListComponent } from './users-movements/users-movements-list/users-movements-list.component';
import { PassiveStudentListComponent } from './user/passive-student-list/passive-student-list.component';
import { AdminPagesComponent } from './admin-pages.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPagesComponent,
    children: [
      {
        path: 'students',
        component: StudentListComponent,
        data: { returnUrl: window.location.pathname },
      },
      {
        path: 'passiveStudents',
        component: PassiveStudentListComponent,
      },
      {
        path: 'personaltrainers',
        canActivate:[AdminGuard],
        component: PersonalTrainerListComponent,
      },
      {
        path: 'movements',
        component: MovementListComponent,
      },
      {
        path: 'usersmovements/:studentId',
        component: UsersMovementsListComponent,
      },
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      { path: '**', redirectTo: 'user', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPagesRoutingModule {}
