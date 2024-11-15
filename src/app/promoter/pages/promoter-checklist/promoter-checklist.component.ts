import { Component } from '@angular/core';

@Component({
  selector: 'app-promoter-checklist',
  templateUrl: './promoter-checklist.component.html',
  styleUrl: './promoter-checklist.component.css'
})
export class PromoterChecklistComponent {
  visible: boolean = true;
  paginatedRequesters: any[] = [
    {
      userId: 1,
      name: 'Joaquin Montoya Marín',
      image: 'https://randomuser.me/api/portraits',
      checked: false
    },
    {
      userId: 2,
      name: 'Luis Eduardo Herrera Gonzalez',
      image: 'https://randomuser.me/api/portraits',
      checked: false
    },
    {
      userId: 2,
      name: 'Jonatan Martin Quiroz',
      image: 'https://randomuser.me/api/portraits',
      checked: false
    }
  ];
  constructor() { }

  showDialog() {
    this.visible = true;
  }
}
