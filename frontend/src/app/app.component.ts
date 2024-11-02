import { Component, ModuleWithComponentFactories } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { ListasTodoComponent } from './listas-todo/listas-todo.component';
import { ServicoListas } from './lista-item/lista-item.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, ListasTodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ServicoListas]
})
export class AppComponent {
  constructor(private listService : ServicoListas) {}
}
 