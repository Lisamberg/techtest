import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';

export const routes: Routes = [
    { path: 'users', component: UsersListComponent },
    { path: 'add', component: AddUserComponent },
];
