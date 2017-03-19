export class Pessoa {
    id: number
    cpf: number
    email: string
    nome: string
    telefone: string

    constructor(id: number, cpf: number, email: string, nome: string, telefone: string) {
        this.id = id;
        this.cpf = cpf;
        this.email = email;
        this.nome = nome;
        this.telefone = telefone;
    }
}