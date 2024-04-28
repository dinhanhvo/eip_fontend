import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CokhiComponent } from './cokhi.component';

describe('CokhiComponent', () => {
  let component: CokhiComponent;
  let fixture: ComponentFixture<CokhiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CokhiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CokhiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
