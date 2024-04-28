import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KetoanthongkeComponent } from './ketoanthongke.component';

describe('KetoanthongkeComponent', () => {
  let component: KetoanthongkeComponent;
  let fixture: ComponentFixture<KetoanthongkeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KetoanthongkeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KetoanthongkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
