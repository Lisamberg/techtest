import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-updating-user-overview',
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
        RouterModule,
    ],
    providers: [UserService],
    templateUrl: './modal-updating-user-overview.component.html',
    styleUrl: './modal-updating-user-overview.component.css',
})
export class ModalUpdatingUserOverviewComponent implements OnDestroy, OnInit {
    firstName = '';
    lastName = '';
    shouldReloadUsersList = false;

    constructor(
        public dialogRef: MatDialogRef<AddUserComponent>,
        public router: Router,
        public route: ActivatedRoute,
        private userService: UserService,
        @Inject(MAT_DIALOG_DATA) public data: { userId: string }
    ) {}

    ngOnInit(): void {
        // Appeler le service pour obtenir les détails de l'utilisateur
        this.userService.getUser(this.data.userId).subscribe({
            next: (data) => {
                this.firstName = data.firstName;
                this.lastName = data.lastName;
            },
            error: (err) =>
                console.log(
                    "Erreur lors de la récupération de l'utilisateur:",
                    err
                ),
        });
    }

    ngOnDestroy(): void {
        this.router.navigateByUrl('/', {
            state: {
                shouldReloadUsersList: this.shouldReloadUsersList,
            },
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    async onUpdate(): Promise<void> {
        this.userService
            .updateUser({
                id: this.data.userId,
                firstName: this.firstName,
                lastName: this.lastName,
            })
            .subscribe({
                next: (data) => {
                    this.dialogRef.close();
                    this.shouldReloadUsersList = true;
                },
                error: (err) => console.error('Error fetching users:', err),
            });
    }
}
