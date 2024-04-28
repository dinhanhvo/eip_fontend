import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CokhihomeComponent } from './cokhihome.component';

describe('CokhihomeComponent', () => {
  let component: CokhihomeComponent;
  let fixture: ComponentFixture<CokhihomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CokhihomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CokhihomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
