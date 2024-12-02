// src/app/profiles/components/profile-edit-icon/profile-edit-icon.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from '../../model/profile';

@Component({
  selector: 'app-profile-edit-icon',
  templateUrl: './profile-edit-icon.component.html',
  styleUrls: ['./profile-edit-icon.component.css']
})
export class ProfileEditIconComponent {
  @Input() editDialogVisible: boolean = false;
  @Input() profile: Profile = {} as Profile;
  @Output() onSave = new EventEmitter<File>();
  @Output() onCancel = new EventEmitter();

  newIcon: File | null = null;
  newIconPreview: string | ArrayBuffer | null | undefined = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files![0]) {
      this.newIcon = input.files![0];
      const reader = new FileReader();
      reader.onload = (e) => this.newIconPreview = e.target?.result;
      reader.readAsDataURL(this.newIcon);
    }
  }

  onDialogCancel(): void {
    this.onCancel.emit();
  }

  onContinue(): void {
    if (this.newIcon) {
      this.onSave.emit(this.newIcon);
    }
  }
}
