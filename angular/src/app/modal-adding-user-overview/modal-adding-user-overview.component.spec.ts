import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddingUserOverviewComponent } from './modal-adding-user-overview.component';

describe('ModalAddingUserOverviewComponent', () => {
  let component: ModalAddingUserOverviewComponent;
  let fixture: ComponentFixture<ModalAddingUserOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddingUserOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAddingUserOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
