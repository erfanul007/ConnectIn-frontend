import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortprofileComponent } from './shortprofile.component';

describe('ShortprofileComponent', () => {
  let component: ShortprofileComponent;
  let fixture: ComponentFixture<ShortprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShortprofileComponent]
    });
    fixture = TestBed.createComponent(ShortprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
