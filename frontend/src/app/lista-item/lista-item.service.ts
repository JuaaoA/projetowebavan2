import { inject, Inject, Injectable, ModuleWithComponentFactories } from "@angular/core";
import { ModeloTarefa } from "./lista-item.model";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, BehaviorSubject, map } from "rxjs";
import { ErrorHandler } from "@angular/core";

@Injectable({providedIn: "root"})
export class ServicoListas {

    // URL do backend para comunicação com o banco
    private baseUrl : string = "http://localhost:3000";

    // Lista que foi selecionada
    private lista_selected : string = "Modelo 1";

    // Cliente http
    private http = inject(HttpClient);

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

    errorHandler(e: any, info: string): Observable<any> {
        throw({
            info_extra: info,
            error_SS: e,
            error_CS: "Client-Side, deu ruim patrão"
        })
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

    AdicionarTarefa(task : ModeloTarefa)
    {
        this.listas[this.lista_selected][task.local].push(task);

        task.modelo = this.lista_selected;

        // Adicionar tarefa no banco de dados
        return this.http.post<any>(`${this.baseUrl}/tasks`, task).pipe(
            catchError((e) => this.errorHandler(e, "adicionarTarefa()"))
        );
    }

    getLista(lista : string)
    {
        return this.listas[this.lista_selected][lista];
    }

    getListaBanco()
    {
        //

        return this.http.get<any>(`${this.baseUrl}/`).pipe(
            map((responseRecebida : any) => {
                console.log(responseRecebida.msgSucesso);
                console.log({nome: responseRecebida.objTask[0].conteudo});
                console.log({local: responseRecebida.objTask[0].local});

                /*
                const messageSResponseRecebida = responseRecebida.objSMessageSRecuperadoS;

                let transformedCastMessagesModelFrontend: ModeloMensagem[] = [];
                for (let msg of messageSResponseRecebida) {
                    transformedCastMessagesModelFrontend.push(
                        new ModeloMensagem(msg.content, msg.user, msg.gender, msg.age, msg.color,msg.icone, msg._id));
                }

                responseRecebida.objSMessageSRecuperadoS = [...transformedCastMessagesModelFrontend]

                console.log({myMsgSucesso: responseRecebida.myMsgSucesso});
                console.log({conteudo: responseRecebida.objSMessageSRecuperadoS[0].content})
                console.log({id: responseRecebida.objSMessageSRecuperadoS[0].messageId})
                */
                return responseRecebida;
            }),
            catchError((e) => this.errorHandler(e, "getlistabanco()"))
        )
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