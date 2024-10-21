import { Component, Inject, OnDestroy } from '@angular/core';
import {
    MAT_DIALOG_DATA,
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
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from '../modal-common/modal-component';

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
export class ModalAddingUserOverviewComponent
    extends ModalComponent
    implements OnDestroy
{
    constructor(
        public userService: UserService,
        dialogRef: MatDialogRef<AddUserComponent>,
        router: Router,
        route: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) data: { userId: string }
    ) {
        super(dialogRef, router, route, data);
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
