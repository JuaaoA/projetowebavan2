import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasTodoComponent } from './listas-todo.component';

describe('ListasTodoComponent', () => {
  let component: ListasTodoComponent;
  let fixture: ComponentFixture<ListasTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListasTodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListasTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
