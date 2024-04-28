import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaclsComponent } from './giacls.component';

describe('GiaclsComponent', () => {
  let component: GiaclsComponent;
  let fixture: ComponentFixture<GiaclsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaclsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaclsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
