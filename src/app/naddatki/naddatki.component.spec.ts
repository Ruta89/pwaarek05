import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaddatkiComponent } from './naddatki.component';

describe('NaddatkiComponent', () => {
  let component: NaddatkiComponent;
  let fixture: ComponentFixture<NaddatkiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaddatkiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaddatkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
