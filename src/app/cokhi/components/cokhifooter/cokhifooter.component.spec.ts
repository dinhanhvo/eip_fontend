import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CokhifooterComponent } from './cokhifooter.component';

describe('CokhifooterComponent', () => {
  let component: CokhifooterComponent;
  let fixture: ComponentFixture<CokhifooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CokhifooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CokhifooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
