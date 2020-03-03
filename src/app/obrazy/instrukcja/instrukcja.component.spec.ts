import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrukcjaComponent } from './instrukcja.component';

describe('InstrukcjaComponent', () => {
  let component: InstrukcjaComponent;
  let fixture: ComponentFixture<InstrukcjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrukcjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrukcjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
