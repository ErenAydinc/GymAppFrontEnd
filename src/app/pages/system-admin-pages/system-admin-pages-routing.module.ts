import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { MovementListComponent } from './movement/movement-list-manage/movement-list.component';
import { SystemAdminPagesComponent } from './system-admin-pages.component';

const routes: Routes = [{
  path: '',
    component: SystemAdminPagesComponent,
    children: [
      {
        path: 'customers',
        component: CustomerComponent,
      },
      {
        path: 'movements',
        component: MovementListComponent,
      },
      // {
      //   path: 'movements',
      //   component: MovementListComponent,
      // },
      // {
      //   path: 'studentsmovements/:studentId',
      //   component: UsersMovementsListComponent,
      // },
      // {
      //   path: 'studentsmovements/create',
      //   component: UsersMovementsCreateComponent,
      // },
    ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemAdminPagesRoutingModule { }
