import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { UserAdderButtonComponent } from './user-adder-button/user-adder-button.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        UsersListComponent,
        UserAdderButtonComponent,
        AddUserComponent,
        HttpClientModule,
    ],
    providers: [UserService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'ng-app';
}
