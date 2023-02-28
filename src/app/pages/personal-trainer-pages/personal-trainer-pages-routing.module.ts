import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovementListComponent } from './movement/movement-list/movement-list.component';
import { PersonalTrainerPagesComponent } from './personal-trainer-pages.component';
import { StudentsComponent } from './students/students.component';
import { UsersMovementsCreateComponent } from './users-movements/users-movements-create/users-movements-create.component';
import { UsersMovementsListComponent } from './users-movements/users-movements-list/users-movements-list.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalTrainerPagesComponent,
    children: [
      {
        path: 'students',
        component: StudentsComponent,
        data: { returnUrl: window.location.pathname },
      },
      {
        path: 'movements',
        component: MovementListComponent,
      },
      {
        path: 'studentsmovements/:studentId',
        component: UsersMovementsListComponent,
      },
      {
        path: 'studentsmovements/create',
        component: UsersMovementsCreateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalTrainerPagesRoutingModule {}
