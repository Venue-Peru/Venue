import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditBackgroundComponent } from './profile-edit-background.component';

describe('ProfileEditBackgroundComponent', () => {
  let component: ProfileEditBackgroundComponent;
  let fixture: ComponentFixture<ProfileEditBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEditBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
