import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWristbandsComponent } from './my-wristbands.component';

describe('MyWristbandsComponent', () => {
  let component: MyWristbandsComponent;
  let fixture: ComponentFixture<MyWristbandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyWristbandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyWristbandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
