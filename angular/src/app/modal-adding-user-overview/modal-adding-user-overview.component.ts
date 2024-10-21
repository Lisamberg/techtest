import { Component, OnDestroy, inject } from '@angular/core';
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
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    _snackBar = inject(MatSnackBar);
    firstName = '';
    lastName = '';
    shouldReloadUsersList = false;

    constructor(
        public dialogRef: MatDialogRef<AddUserComponent>,
        public router: Router,
        private userService: UserService
    ) {}

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

    openSnackBar(
        message: string,
        action: string = '',
        duration: number = 2000
    ) {
        this._snackBar.open(message, action, {
            duration: duration,
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

    async onAdd(): Promise<void> {
        this.userService
            .addUser({
                firstName: this.firstName,
                lastName: this.lastName,
            })
            .subscribe({
                next: (data) => {
                    this.openSnackBar('Utilisateur ajouté ✔️');
                    this.dialogRef.close();
                    this.shouldReloadUsersList = true;
                },
                error: (err) => {
                    if (err.status === 400) {
                        this.openSnackBar(
                            'Erreur: utilisateur déjà existant ⛔',
                            'Fermer',
                            0
                        );
                    } else {
                        console.error('Error fetching users:', err);
                        this.openSnackBar(
                            'Une erreur est survenue 🤔',
                            'Fermer',
                            0
                        );
                    }
                },
            });
    }
}
