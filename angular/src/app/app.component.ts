import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
    NavigationEnd,
    Router,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    RouterOutlet,
} from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { UserService } from './services/user.service';

import { User } from './models/user.model';

import { BehaviorSubject, filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        HttpClientModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ],
    providers: [UserService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

    usersSubject = new BehaviorSubject<User[]>([]);
    dataSource = new MatTableDataSource<User>();
    displayedColumns: string[] = ['No', 'ID', 'lastName', 'firstName'];
    shouldReloadUsersList = false;

    constructor(private userService: UserService, private router: Router) {}

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator as MatPaginator;
    }

    ngOnInit(): void {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                const navigation = this.router.getCurrentNavigation();
                if (navigation?.extras.state) {
                    this.shouldReloadUsersList =
                        navigation.extras.state['shouldReloadUsersList'];
                    if (this.shouldReloadUsersList) {
                        this.loadUsers();
                    }
                }
            });

        this.loadUsers();
    }

    loadUsers(): void {
        this.userService.getUsers().subscribe({
            next: (data) => {
                this.usersSubject.next(data);
            },
            error: (err) => console.error('Error fetching users:', err),
        });

        this.usersSubject.subscribe((users) => {
            this.dataSource.data = users;
        });
    }
}
