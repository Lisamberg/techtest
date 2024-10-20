import { Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

export const routes: Routes = [
    {
        path: 'add',
        component: AddUserComponent,
    },
    {
        path: 'edit/:id',
        component: UpdateUserComponent,
    },
];
