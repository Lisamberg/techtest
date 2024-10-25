import { Component, Inject, OnDestroy, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
    template: '',
})
export abstract class ModalComponent implements OnDestroy {
    _snackBar = inject(MatSnackBar);
    firstName = '';
    lastName = '';
    shouldReloadUsersList = false;

    constructor(
        public dialogRef: MatDialogRef<AddUserComponent | UpdateUserComponent>,
        public router: Router,
        public route: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) public data: { userId: string }
    ) {}

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

    openSnackBar(
        message: string,
        action: string = '',
        duration: number = 2000
    ) {
        this._snackBar.open(message, action, {
            duration: duration,
        });
    }
}
