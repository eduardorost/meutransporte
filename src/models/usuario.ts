import { Pessoa } from './pessoa';
import { Empresa } from './empresa';

export class Usuario {
    id: number;
    empresa?: Empresa;
    login: string;
    pessoa?: Pessoa;
    senha: string;
    status: string;

    constructor(id: number, empresa: Empresa, login: string, senha: string, pessoa: Pessoa, status: string) {
        this.id = id;
        this.empresa = empresa;
        this.login = login;
        this.senha = senha;
        this.pessoa = pessoa;
        this.status = status;
    }
}