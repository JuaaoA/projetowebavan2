import { Injectable } from "@angular/core";
import { ModeloTarefa } from "./lista-item.model";

@Injectable({providedIn: "root"})
export class ServicoListas {

    // URL do backend para comunicação com o banco
    private urlBack : string = "";

    // Lista que foi selecionada
    private lista_selected : string = "Modelo 1";

    /*
        Organização das listas

        listas = abas -> lista -> item 
    */
    private listas : {[index : string] : any}= {
        "Modelo 1": {

            "todo": [
                new ModeloTarefa('Lavar o carro', "todo"),
                new ModeloTarefa('Fazer compras no mercado', "todo"),
                new ModeloTarefa('Faxina na casa', "todo")
            ],

            "doing": [
                new ModeloTarefa('Arrumar o pc', "doing"),
                new ModeloTarefa('Abastecer o carro', "doing")
            ],

            "done": [
                new ModeloTarefa('Arrumar a cama', "done"),
                new ModeloTarefa('Tomar café', "done")
            ]
        },

        "Modelo 2": {

            "todo": [
                new ModeloTarefa('Implementar requisito 3', "todo"),
                new ModeloTarefa('Resolver bug numero 9', "todo"),
                new ModeloTarefa('Remover implementação', "todo")
            ],

            "doing": [
                new ModeloTarefa('Realizar conexão com o banco', "doing"),
                new ModeloTarefa('Realizar conexão com o backend', "doing")
            ],

            "done": [
                new ModeloTarefa('Implementar requisito 2', "done"),
                new ModeloTarefa('Resolver bug numero 8', "done")
            ]
        },

        "Modelo 3": {

            "todo": [
                new ModeloTarefa('Receber os clientes', "todo"),
                new ModeloTarefa('Finalizar pedidos', "todo"),
                new ModeloTarefa('Fechar o restaurante', "todo")
            ],

            "doing": [
                new ModeloTarefa('Abrir o restaurante', "doing"),
                new ModeloTarefa('Arrumar as mesas', "doing")
            ],

            "done": [
                new ModeloTarefa('Ligar a churrasqueira', "done"),
                new ModeloTarefa('Ligar as luzes', "done")
            ]
        }
    }

    MoverParaLista(task : ModeloTarefa, location : string) 
    {
        // Primeiro, remover a tarefa anterior
        this.listas[this.lista_selected][task.local].splice(this.listas[this.lista_selected][task.local].indexOf(task), 1);

        // Próximo é adicionar a tarefa para a lista adicionada
        task.local = location;
        this.listas[this.lista_selected][location].push(task)
    }

    ApagarTarefa(task : ModeloTarefa)
    {
        // Remover a tarefa
        this.listas[this.lista_selected][task.local].splice(this.listas[this.lista_selected][task.local].indexOf(task), 1);
    }

    getLista(lista : string)
    {
        return this.listas[this.lista_selected][lista];
    }

    getLista_selected()
    {
        return this.lista_selected;
    }

    setLista_selected(value : string)
    {
        this.lista_selected = value;
    }

}