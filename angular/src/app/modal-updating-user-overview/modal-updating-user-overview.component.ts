import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';

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
    _snackBar = inject(MatSnackBar);
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

    isFormValid(): boolean {
        const namePattern = /^[a-zA-Z\s'-]+$/; // Autorise uniquement les lettres, les espaces les tirets et les ' (O'connor)
        return (
            this.firstName.trim() !== '' &&
            this.lastName.trim() !== '' &&
            namePattern.test(this.firstName) &&
            namePattern.test(this.lastName)
        );
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

    openSnackBar(message: string) {
        this._snackBar.open(message, '', {
            duration: 2000,
        });
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
                    this.openSnackBar('Utilisateur modifié ✔️');
                    this.dialogRef.close();
                    this.shouldReloadUsersList = true;
                },
                error: (err) => console.error('Error fetching users:', err),
            });
    }
}
