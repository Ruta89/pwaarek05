import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZdjeciaComponent } from './zdjecia.component';

describe('ZdjeciaComponent', () => {
  let component: ZdjeciaComponent;
  let fixture: ComponentFixture<ZdjeciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZdjeciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZdjeciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
