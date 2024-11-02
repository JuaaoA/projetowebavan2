import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToptabComponent } from './toptab.component';

describe('ToptabComponent', () => {
  let component: ToptabComponent;
  let fixture: ComponentFixture<ToptabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToptabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToptabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
