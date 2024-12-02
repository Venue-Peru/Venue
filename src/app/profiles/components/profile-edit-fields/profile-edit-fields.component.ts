import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Profile} from "../../model/profile";

@Component({
  selector: 'app-profile-edit-fields',
  templateUrl: './profile-edit-fields.component.html',
  styleUrl: './profile-edit-fields.component.css'
})
export class ProfileEditFieldsComponent implements OnChanges {
  @Input() profile: Profile = {} as Profile;
  @Input() editDialogVisible: boolean = false;
  @Output() onSave = new EventEmitter<Profile>();
  @Output() onCancel = new EventEmitter();

  profileCopy: Profile = {} as Profile;

  editDialogSubmit() {
    this.profileCopy = { ...this.profile };
    this.onSave.emit(this.profileCopy);
  }

  editDialogCancel() {
    this.onCancel.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editDialogVisible'] && this.editDialogVisible) {
      // make a copy of the profile to edit
      this.profileCopy = { ...this.profile };
    }
  }
}
