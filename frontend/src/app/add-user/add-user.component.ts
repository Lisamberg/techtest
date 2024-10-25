import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddingUserOverviewComponent } from '../modal-adding-user-overview/modal-adding-user-overview.component';

@Component({
    standalone: true,
    imports: [],
    template: `<div></div>`,
})
export class AddUserComponent {
    currentDialog = null;

    constructor(private dialog: MatDialog) {
        this.dialog.open(ModalAddingUserOverviewComponent);
    }
}
