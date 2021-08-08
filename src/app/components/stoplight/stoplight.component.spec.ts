import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { StoplightComponent } from './stoplight.component';

describe('StoplightComponent', () => {
  let component: StoplightComponent;
  let fixture: ComponentFixture<StoplightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ StoplightComponent ],
      imports: [
        MatCardModule,
        MatIconModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoplightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run lightCycle() timeouts as long as the interval time', () => {
    expect(component.runTime).toBe(9500);
    expect(component.runTime).toEqual(component.calculateIntervalTime(component.data));
  });

  it('should return valid [ngClass] object when getClass() is called', () => {
    const mockLight = {
      color: "yellow",
      time: 1500,
      active: true
    };
    const mockResult = { 
      red: false, 
      yellow: true, 
      green: false
    };
    const result = component.getClass(mockLight);
    expect(result).toEqual(mockResult);
  });
});
