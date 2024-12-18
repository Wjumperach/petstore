import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pet-confirmation-dialog',
  standalone: true,
  imports: [ MatDialogModule, MatDialogClose, MatButtonModule ],
  templateUrl: './pet-confirmation-dialog.component.html',
  styleUrl: './pet-confirmation-dialog.component.css'
})
export class PetConfirmationDialogComponent {
  public confirmMessage: string = '';
}
