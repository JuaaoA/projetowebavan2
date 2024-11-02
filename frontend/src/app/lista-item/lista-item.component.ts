import { Component, Input } from '@angular/core';
import { ServicoListas } from './lista-item.service';
import { ModeloTarefa } from './lista-item.model';

@Component({
  selector: 'app-lista-item',
  standalone: true,
  imports: [],
  templateUrl: './lista-item.component.html',
  styleUrl: './lista-item.component.css'
})
export class ListaItemComponent {

  /*
    TODO - TERMINAR OS BOTOES REMOVER E MOVER
  */

  constructor(public listService : ServicoListas) {}

  @Input() modelo : ModeloTarefa = new ModeloTarefa("", "");

  clicked : boolean = false

  ToggleOptions()
  {
    this.clicked = !this.clicked
  }

  RemoverSelf()
  {
    this.listService.ApagarTarefa(this.modelo);
  }

  MoverFrente()
  {

    var target : string = "";
    switch(this.modelo.local)
    {
      case "todo":
        target = 'doing'
        break;
      
      case 'doing':
        target = 'done'
        break;
    }

    if (target == "")
    {
      return;
    }

    this.listService.MoverParaLista(this.modelo, target)
  }

  MoverTras()
  {
    var target : string = "";
    switch(this.modelo.local)
    {
      case "doing":
        target = 'todo'
        break;
      
      case 'done':
        target = 'doing'
        break;
    }

    if (target == "")
    {
      return;
    }

    this.listService.MoverParaLista(this.modelo, target)
  }
}
