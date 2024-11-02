import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { ListaItemComponent } from '../lista-item/lista-item.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ServicoListas } from '../lista-item/lista-item.service';
import { ModeloTarefa } from '../lista-item/lista-item.model';


@Component({
  selector: 'app-listas-todo',
  standalone: true,
  imports: [ListaItemComponent, FormsModule],
  templateUrl: './listas-todo.component.html',
  styleUrl: './listas-todo.component.css'
})
export class ListasTodoComponent implements OnInit {

  constructor(public listService : ServicoListas,
    private alteracao : ChangeDetectorRef
  ) {}

  @Input() todo : ModeloTarefa[] = []

  @Input() doing : ModeloTarefa[] = []

  @Input() done : ModeloTarefa[] = []

  // Se o usuário está criando um novo item
  isAdding : string = 'none';

  ToggleIsAdding(location : string)
  {
    // Se não estiver escolhido nada
    if (this.isAdding == 'none')
    {
      // Adicionar o local que está sendo indicado
      this.isAdding = location;

      return;
    }

    // Retornar para nulo
    this.isAdding = 'none';
  }

  AdicionarItem(form : NgForm)
  {
    // Não deixar o usuário enviar o vazio
    if (form.value.formNovaItem == "")
    {
      return;
    }

    //
    const modelo : ModeloTarefa = new ModeloTarefa(form.value.formNovaItem, "");

    // Decidir onde colocar o item
    modelo.local = this.isAdding;
    this.listService.AdicionarTarefa(modelo)
      .subscribe({
      next: (dadosSucesso: any) => {
        console.log(dadosSucesso.myMsgSucesso);

      },
      error: (dadosErro) => {
        console.log(`$== !!Error (subscribe): ${dadosErro.error} ==`);
        console.log(dadosErro);
      }
    });

    // Resetar os botões
    this.ToggleIsAdding('none');

    // Resetar form
    form.reset();
  }

  UpdateLists()
  {
    this.todo = this.listService.getLista('todo');
    this.doing = this.listService.getLista('doing');
    this.done = this.listService.getLista('done');
  }

  ngOnInit(): void {

    this.listService.getListaBanco()

    setInterval(() => {
      this.UpdateLists();
    }, 100)
  }
}
