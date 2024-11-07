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
                
            ],

            "doing": [
                
            ],

            "done": [
                
            ]
        },

        "Modelo 2": {

            "todo": [
                
            ],

            "doing": [
                
            ],

            "done": [
                
            ]
        },

        "Modelo 3": {

            "todo": [
                
            ],

            "doing": [
                
            ],

            "done": [
                
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
        // Mover para o lado do cliente
        this.MoverParaListaServico(task, location);

        // Alterar antes o local da tarefa
        task.local = location;

        // Remover tarefa no backend
        return this.http.patch<any>(`${this.baseUrl}/tasks/`, task).pipe(
            catchError((e) => this.errorHandler(e, "adicionarTarefa()"))
        );
    }

    MoverParaListaServico(task : ModeloTarefa, location : string) 
    {
        // Primeiro, remover a tarefa anterior
        this.listas[this.lista_selected][task.local].splice(this.listas[this.lista_selected][task.local].indexOf(task), 1);

        // Próximo é adicionar a tarefa para a lista adicionada
        task.local = location;
        this.listas[this.lista_selected][location].push(task)
    }

    ApagarTarefa(task : ModeloTarefa)
    {
        // Remover tarefa no backend
        return this.http.patch<any>(`${this.baseUrl}/tasks/delete`, task).pipe(
            catchError((e) => this.errorHandler(e, "adicionarTarefa()"))
        );
    }

    ApagarTarefaServico(task : ModeloTarefa)
    {
        // Remover a tarefa no cliente
        this.listas[this.lista_selected][task.local].splice(this.listas[this.lista_selected][task.local].indexOf(task), 1);
    }

    AdicionarTarefaServico(task : ModeloTarefa)
    {
        // Definir o modelo que a tarefa foi adicionada
        task.modelo = this.lista_selected;

        // Adicionar a tarefa no lado do cliente
        this.listas[this.lista_selected][task.local].push(task);
    }

    AdicionarTarefa(task : ModeloTarefa)
    {
        // Definir em que modelo a tarefa foi adicionado
        task.modelo = this.lista_selected;

        // Adicionar tarefa no banco de dados
        return this.http.post<any>(`${this.baseUrl}/tasks`, task).pipe(
            catchError((e) => this.errorHandler(e, "adicionarTarefa()"))
        );
    }

    ConfigurarListas(listas : ModeloTarefa[])
    {
        for (var item of listas)
        {
            item.modelo?.toString();

            this.listas[item.modelo][item.local].push(item);
        }
    }

    getLista(lista : string)
    {
        return this.listas[this.lista_selected][lista];
    }

    getListaBanco()
    {
        //

        return this.http.get<any>(`${this.baseUrl}/tasks`).pipe(
            map((responseRecebida : any) => {
                console.log(responseRecebida.msgSucesso);
                console.log({nome: responseRecebida.objTask[0].conteudo});
                console.log({local: responseRecebida.objTask[0].local});

                const messageSResponseRecebida = responseRecebida.objTask;

                let transformedCastMessagesModelFrontend: ModeloTarefa[] = [];
                for (let msg of messageSResponseRecebida) {
                    transformedCastMessagesModelFrontend.push(
                        new ModeloTarefa(msg.conteudo, msg.local, msg.modelo, msg._id));
                }

                responseRecebida.objSMessageSRecuperadoS = [...transformedCastMessagesModelFrontend]

                console.log({myMsgSucesso: responseRecebida.myMsgSucesso});
                console.log({conteudo: responseRecebida.objSMessageSRecuperadoS[0].conteudo})
                console.log({id: responseRecebida.objSMessageSRecuperadoS[0]._id})
                
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