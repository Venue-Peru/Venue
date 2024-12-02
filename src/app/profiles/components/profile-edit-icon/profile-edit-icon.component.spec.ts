import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditIconComponent } from './profile-edit-icon.component';

describe('ProfileEditIconComponent', () => {
  let component: ProfileEditIconComponent;
  let fixture: ComponentFixture<ProfileEditIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEditIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
