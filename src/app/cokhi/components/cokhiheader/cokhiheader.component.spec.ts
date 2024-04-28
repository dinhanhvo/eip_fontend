import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CokhiheaderComponent } from './cokhiheader.component';

describe('CokhiheaderComponent', () => {
  let component: CokhiheaderComponent;
  let fixture: ComponentFixture<CokhiheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CokhiheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CokhiheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
