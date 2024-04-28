import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceltoolComponent } from './exceltool.component';

describe('ExceltoolComponent', () => {
  let component: ExceltoolComponent;
  let fixture: ComponentFixture<ExceltoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceltoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceltoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
