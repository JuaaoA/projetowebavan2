export class ModeloAba {
    constructor(
        public nome: string,
        public _id?: string,
    ) {}
}

export class ModeloTarefa {
    constructor(
        public nome : string,
        public local : string,
        public modelo : string,
        public id : string
    ){}
}