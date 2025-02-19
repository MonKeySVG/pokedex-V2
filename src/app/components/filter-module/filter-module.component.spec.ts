import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterModuleComponent } from './filter-module.component';

describe('FilterModuleComponent', () => {
  let component: FilterModuleComponent;
  let fixture: ComponentFixture<FilterModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
