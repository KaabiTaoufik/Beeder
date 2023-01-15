import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsFilterComponent } from './animals-filter.component';

describe('AnimalsFilterComponent', () => {
  let component: AnimalsFilterComponent;
  let fixture: ComponentFixture<AnimalsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalsFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
