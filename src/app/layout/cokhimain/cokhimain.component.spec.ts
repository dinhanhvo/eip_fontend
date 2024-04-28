import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CokhimainComponent } from './cokhimain.component';

describe('CokhimainComponent', () => {
  let component: CokhimainComponent;
  let fixture: ComponentFixture<CokhimainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CokhimainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CokhimainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
