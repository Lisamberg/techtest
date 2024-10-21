import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../modal-common/modal-component';
import { UpdateUserComponent } from '../update-user/update-user.component';

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
export class ModalUpdatingUserOverviewComponent
    extends ModalComponent
    implements OnDestroy, OnInit
{
    constructor(
        public userService: UserService,
        dialogRef: MatDialogRef<UpdateUserComponent>,
        router: Router,
        route: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) data: { userId: string }
    ) {
        super(dialogRef, router, route, data);
    }

    ngOnInit(): void {
        this.userService.getUser(this.data.userId).subscribe({
            next: (data) => {
                this.firstName = data.firstName;
                this.lastName = data.lastName;
            },
            error: (err) => {
                this.openSnackBar('Une erreur est survenue 🤔', 'Fermer', 0);
                console.log(
                    "Erreur lors de la récupération de l'utilisateur:",
                    err
                );
            },
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
                error: (err) => {
                    if (err.status === 400) {
                        this.openSnackBar(
                            'Erreur: utilisateur déjà existant ⛔',
                            'Fermer',
                            0
                        );
                    } else {
                        this.openSnackBar(
                            'Une erreur est survenue 🤔',
                            'Fermer',
                            0
                        );
                    }
                    console.log("Erreur lors de la MAJ de l'utilisateur:", err);
                },
            });
    }
}
