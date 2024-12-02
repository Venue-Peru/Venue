import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HostService } from '../../services/host.service';
import { Host } from '../../model/host';
@Component({
  selector: 'app-host-visitor',
  templateUrl: './host-visitor.component.html',
  styleUrl: './host-visitor.component.css'
})
export class HostVisitorComponent implements OnInit {
  start: boolean | null = false;
  host: Host = {} as Host;
  posts: any[] = [];
  isThisUser: boolean = false;
  editDialogVisible_fields: boolean = false;
  editDialogVisible_icon: boolean = false;
  editDialogVisible_background: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private hostService: HostService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['hostId']) {
        this.hostService.getByUUID(params['hostId']).subscribe(
          host => {
            this.start = true;
            this.host = host;
            this.isThisUser = this.checkIfThisUser(host);
          },
          error => {
            this.start = null;
          }
        );
      } else {
        this.start = null;
      }
    });
  }

  checkIfThisUser(host: Host): boolean {
    // Implement logic to check if the current user is the host
    return false;
  }

  openEditDialog(): void {
    this.editDialogVisible_fields = true;
  }

  onClickingIcon(): void {
    this.editDialogVisible_icon = true;
  }

  onClickingBackground(): void {
    this.editDialogVisible_background = true;
  }

  onSave_fields(event: any): void {
    // Implement save logic for fields
  }

  onCancel_fields(): void {
    this.editDialogVisible_fields = false;
  }

  onSave_icon(event: any): void {
    // Implement save logic for icon
  }

  onCancel_icon(): void {
    this.editDialogVisible_icon = false;
  }

  onSave_background(event: any): void {
    // Implement save logic for background
  }

  onCancel_background(): void {
    this.editDialogVisible_background = false;
  }
}
