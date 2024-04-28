import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CokhimenuComponent } from './cokhimenu.component';

describe('CokhimenuComponent', () => {
  let component: CokhimenuComponent;
  let fixture: ComponentFixture<CokhimenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CokhimenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CokhimenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
