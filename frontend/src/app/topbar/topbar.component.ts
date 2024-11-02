import { Component, input, Input } from '@angular/core';
import { ToptabComponent } from '../toptab/toptab.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ModeloAba } from '../lista-item/lista-item.model';
import { ServicoListas } from '../lista-item/lista-item.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [ToptabComponent, FormsModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  constructor(public listService : ServicoListas) {}

  // FRONT = todas as abas
  @Input() todo_tabs : ModeloAba[] = [
  new ModeloAba("Modelo 1"), 
  new ModeloAba("Modelo 2"),
  new ModeloAba("Modelo 3")
  ];
}
