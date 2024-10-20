import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddingUserOverviewComponent } from '../modal-adding-user-overview/modal-adding-user-overview.component';

@Component({
    standalone: true,
    imports: [],
    template: `<div></div>`,
})
export class AddUserComponent implements OnDestroy {
    destroy = new Subject<any>();
    currentDialog = null;

    constructor(private dialog: MatDialog) {
        this.dialog.open(ModalAddingUserOverviewComponent);
    }

    ngOnDestroy() {
        this.destroy.next(true);
    }
}
