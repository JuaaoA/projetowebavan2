import { Component, Input } from '@angular/core';
import { ModeloAba } from '../lista-item/lista-item.model';
import { ServicoListas } from '../lista-item/lista-item.service';

@Component({
  selector: 'app-toptab',
  standalone: true,
  imports: [],
  templateUrl: './toptab.component.html',
  styleUrl: './toptab.component.css'
})
export class ToptabComponent {

  // Construtor
  constructor(public listService : ServicoListas) {}

  // Modelo para a aba
  @Input() modeloTab : ModeloAba = new ModeloAba("", "");

  // Se está editando
  isEditing : boolean = false;

  // Caso o usuário clique, indicar ao service que foi clicado
  SelectedTab()
  {
    // Alterar a aba que foi selecionada
    this.listService.setLista_selected(this.modeloTab.nome);
  }
}
