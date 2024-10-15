import { Component, OnDestroy } from '@angular/core';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { AddingUserComponent } from '../adding-user/adding-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-modal-adding-user-overview',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        HttpClientModule,
    ],
    providers: [UserService],
    templateUrl: './modal-adding-user-overview.component.html',
    styleUrl: './modal-adding-user-overview.component.css',
})
export class ModalAddingUserOverviewComponent implements OnDestroy {
    firstName = '';
    lastName = '';

    constructor(
        public dialogRef: MatDialogRef<AddingUserComponent>,
        public router: Router,
        private userService: UserService
    ) {}

    ngOnDestroy(): void {
        this.router.navigateByUrl('/');
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    async onAdd(): Promise<void> {
        this.userService
            .addUser({
                firstName: this.firstName,
                lastName: this.lastName,
            })
            .subscribe({
                next: (data) => {
                    this.dialogRef.close();
                },
                error: (err) => console.error('Error fetching users:', err),
            });
    }
}
