import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Profile} from "../../../profiles/model/profile";
import {PromoterCodesService} from "../../../requests/services/promoter-codes.service";
import {CreatePromoterCodeRequest} from "../../../requests/model/create-promoter-code-request";
import {PromoterCode} from "../../../requests/model/promoter-code";
import {Session} from "../../../sessions/model/session";

@Component({
  selector: 'app-administrating-session',
  templateUrl: './administrating-session.component.html',
  styleUrl: './administrating-session.component.css'
})
export class AdministratingSessionComponent implements OnChanges {
  permissions: number = 0;
  promoterCodes: PromoterCode[] = [];
  @Input() editDialogVisible: boolean = false;
  @Input() session: Session = {} as Session;
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  dialogVisible_show: boolean = false;
  focusedPromoterCode: PromoterCode = {} as PromoterCode;
  initialized: boolean = false;

  constructor(
    private promoterCodesService: PromoterCodesService,
  ) {
  }

  onPromoterCodeClick(code: PromoterCode) {
    this.focusedPromoterCode = code;
    this.dialogVisible_show = true;
  }

  fetchPromoterCodes() {
    this.promoterCodesService.getPromoterCodesBySessionUuid(this.session.uuid).subscribe(
      response => {
        this.promoterCodes = response;
        this.initialized = true;
      },
        error => {
        this.initialized = true;
        }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initialized = false;
    if (changes['editDialogVisible'] && this.editDialogVisible) {
      this.fetchPromoterCodes();
    }
    if (changes['editDialogVisible'] && !this.editDialogVisible) {
      this.promoterCodes = [];
      this.initialized = true;
    }
  }

  onClickingSubmit() {
    if (this.permissions <= 0) return;
    let createPromoterCodeRequest = new CreatePromoterCodeRequest(this.session.uuid, this.permissions);
    this.promoterCodesService.createPromoterCode(createPromoterCodeRequest).subscribe(
      response => {
        this.focusedPromoterCode = response;
        this.dialogVisible_show = true;
        this.fetchPromoterCodes();
        this.onSave.emit();
      }
    );
  }

  onClickingCancel() {
    this.onCancel.emit();
  }


  onShowClose() {
    this.dialogVisible_show = false;
  }

  getColumnSize() {
    if (this.promoterCodes.length > 0) {
      return 'col-6';
    }
    return 'col-12'
  }
}
