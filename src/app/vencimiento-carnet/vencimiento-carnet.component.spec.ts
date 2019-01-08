import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VencimientoCarnetComponent } from './vencimiento-carnet.component';

describe('VencimientoCarnetComponent', () => {
  let component: VencimientoCarnetComponent;
  let fixture: ComponentFixture<VencimientoCarnetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VencimientoCarnetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VencimientoCarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
