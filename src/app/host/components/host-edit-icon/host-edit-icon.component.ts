import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Host} from "../../model/host";

@Component({
  selector: 'app-host-edit-icon',
  templateUrl: './host-edit-icon.component.html',
  styleUrl: './host-edit-icon.component.css'
})
export class HostEditIconComponent {
  @Input() editDialogVisible: boolean = false;
  @Input() host: Host = {} as Host;
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
