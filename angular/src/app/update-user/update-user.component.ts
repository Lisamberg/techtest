import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalUpdatingUserOverviewComponent } from '../modal-updating-user-overview/modal-updating-user-overview.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    standalone: true,
    imports: [ModalUpdatingUserOverviewComponent],
    template: `<div></div>`,
})
export class UpdateUserComponent {
    constructor(private dialog: MatDialog, public route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const userId = params.get('id');
            // Unable to get route parameters from the modal
            // Passing the route parameter 'userId' directly here instead
            this.dialog.open(ModalUpdatingUserOverviewComponent, {
                data: {
                    userId,
                },
            });
        });
    }
}
