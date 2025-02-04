import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Host} from "../../model/host";

@Component({
  selector: 'app-host-edit-fields',
  templateUrl: './host-edit-fields.component.html',
  styleUrl: './host-edit-fields.component.css'
})
export class HostEditFieldsComponent implements OnChanges, OnInit {
  @Input() host: Host = {} as Host;
  @Input() editDialogVisible: boolean = false;
  @Output() onSave = new EventEmitter<Host>();
  @Output() onCancel = new EventEmitter();

  hostCopy: Host = {} as Host;
  hasChanges: boolean = false;

  editDialogSubmit() {
    this.onSave.emit(this.hostCopy);
  }

  editDialogCancel() {
    this.onCancel.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editDialogVisible'] && this.editDialogVisible) {
      // make a copy of the profile to edit
      this.hostCopy = { ...this.host };
      this.hasChanges = false;
    }
  }

  ngOnInit(): void {
  }

  onFieldChange() {
    this.hasChanges = true;
  }
}
