import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostEditBackgroundComponent } from './host-edit-background.component';

describe('HostEditBackgroundComponent', () => {
  let component: HostEditBackgroundComponent;
  let fixture: ComponentFixture<HostEditBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostEditBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostEditBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
