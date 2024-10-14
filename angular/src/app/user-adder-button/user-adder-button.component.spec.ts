import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdderButtonComponent } from './user-adder-button.component';

describe('UserAdderButtonComponent', () => {
  let component: UserAdderButtonComponent;
  let fixture: ComponentFixture<UserAdderButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAdderButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAdderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
