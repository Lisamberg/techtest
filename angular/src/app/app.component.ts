import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
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

import { BehaviorSubject } from 'rxjs';
import { AddingUserComponent } from './adding-user/adding-user.component';
import { ModalAddingUserOverviewComponent } from './modal-adding-user-overview/modal-adding-user-overview.component';
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
        ModalAddingUserOverviewComponent,
        AddingUserComponent,
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

    displayedColumns: string[] = ['No', 'ID', 'lastName', 'firstName'];
    private usersSubject = new BehaviorSubject<User[]>([]);
    dataSource = new MatTableDataSource<User>();

    constructor(private userService: UserService) {}

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator as MatPaginator;
    }

    ngOnInit(): void {
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
