import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-user-adder-button',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, MatTooltipModule],
    templateUrl: './user-adder-button.component.html',
    styleUrl: './user-adder-button.component.css',
})
export class UserAdderButtonComponent {}
