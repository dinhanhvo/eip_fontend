import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiathuocComponent } from './giathuoc.component';

describe('GiathuocComponent', () => {
  let component: GiathuocComponent;
  let fixture: ComponentFixture<GiathuocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiathuocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiathuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
